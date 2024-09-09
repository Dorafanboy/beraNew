import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { privateKeyToAccount } from 'viem/accounts';
import { printError, printInfo, printSuccess } from './data/logger/logger';
import {
    addTextMessage,
    initializeTelegramBot,
    resetTextMessage,
    sendMessage,
    stopTelegramBot,
} from './data/telegram/telegramBot';
import { delay } from './data/helpers/delayer';
import { Config, DelegateConfig, RewardsConfig, TelegramData } from './config';
import { claimToken } from './data/helpers/requester';
import {
    addPool,
    addPoolNew,
    bexSwapToBTCETH,
    bexSwapToHoney,
    bexSwapToStgUSDC,
    claimBGT,
    depositWBERAHONEY,
} from './core/bex/bex';
import { honeyMintForUSDC } from './core/honey/honey';
import { bendBorrow, bendSupply, bendSupplyETH } from './core/bend/bend';
import { berpsFillVault } from './core/berps/berps';
import {
    boostValidatorBGT,
    claimBGTStationBend,
    claimBGTStationbHoney,
    claimBGTStationwBeraHoney,
    delegateBGT,
    depositBHoneyStation,
} from './core/station/station';
import { queryGalxe } from './core/galxe/galxe';
import { generateRandomUserAgent } from './data/axiosInstance/axiosInstance';
import * as console from 'node:console';
import { PrivateKeyAccount } from 'viem';

let account: PrivateKeyAccount;
const privateKeysFilePath = path.join(__dirname, '..', 'private_keys.txt');
const proxiesFilePath = path.join(__dirname, '..', 'proxies.txt');
const mobileProxieFilePath = path.join(__dirname, '..', 'mobileProxie.txt');

const privateKeysPath = fs.createReadStream(privateKeysFilePath);
const proxiesPath = fs.createReadStream(proxiesFilePath);

let mobileProxieUrl: string = '';
let mobileProxieChangeUrl: string[] = [];

async function readMobileProxies() {
    try {
        const data = await fs.promises.readFile(mobileProxieFilePath, 'utf8');
        const lines = data.split('\n').map((line) => line.trim());
        mobileProxieChangeUrl = lines.slice(1);
        mobileProxieUrl = lines[0];
    } catch (err) {
        console.error(err);
    }
}

async function start() {
    await readMobileProxies();

    const rlPrivateKeys = readline.createInterface({
        input: privateKeysPath,
        crlfDelay: Infinity,
    });

    let rlProxies: readline.Interface | undefined;
    let proxiesIterator: AsyncIterableIterator<string> | undefined;

    if (Config.IsClaimTap && Config.IsStaticProxy) {
        rlProxies = readline.createInterface({
            input: proxiesPath,
            crlfDelay: Infinity,
        });

        proxiesIterator = rlProxies[Symbol.asyncIterator]() as AsyncIterableIterator<string>;

        const privateKeysLines = getFileLines(path.join(__dirname, '..', 'private_keys.txt'));
        const proxiesLines = getFileLines(path.join(__dirname, '..', 'proxies.txt'));

        if (privateKeysLines.length !== proxiesLines.length) {
            printError(
                `Длинны файлов прокси - ${proxiesLines.length} и приватников - ${privateKeysLines.length} не совпадают `,
            );
            return;
        }
    }

    let index = 0;

    const data = fs.readFileSync(privateKeysFilePath, 'utf8');
    const count = data.split('\n').length;

    await initializeTelegramBot(TelegramData.TelegramBotId, TelegramData.TelegramId);

    for await (const line of rlPrivateKeys) {
        try {
            if (line == '') {
                printError(`Ошибка, пустая строка в файле private_keys.txt`);
                return;
            }

            if (Config.isShuffleWallets) {
                printInfo(`Произвожу перемешивание только кошельков.`);
                await shuffleData();

                printSuccess(`Кошельки успешно перемешаны.\n`);
            }

            const proxy =
                Config.IsStaticProxy && Config.IsClaimTap
                    ? (await proxiesIterator!.next()).value
                    : Config.IsMobileProxy
                      ? mobileProxieUrl
                      : '';

            account = privateKeyToAccount(<`0x${string}`>line);
            printInfo(`Start [${index + 1}/${count} - ${account.address}]\n`);
            await generateRandomUserAgent();

            await addTextMessage(`${index + 1}/${count} - ${account.address}\n`);

            const firstFunctions: Array<() => Promise<boolean>> = [
                // () => bexSwapToStgUSDC(account, proxy),
                () => bexSwapToBTCETH(account, proxy),
                () => bexSwapToHoney(account, proxy),
            ];

            const secondFunctions: Array<() => Promise<boolean>> = [
                () => addPoolNew(account, proxy),
                () => honeyMintForUSDC(account),
                () => bendSupplyETH(account),
                () => berpsFillVault(account),
            ];

            const thirdFunctions: Array<() => Promise<boolean>> = [
                () => depositWBERAHONEY(account),
                () => depositBHoneyStation(account),
                () => bendSupply(account),
                () => bendBorrow(account),
            ];

            const fourFunctions: Array<() => Promise<boolean>> = [
                () => claimBGTStationbHoney(account),
                () => claimBGTStationwBeraHoney(account),
                () => claimBGTStationBend(account),
            ];

            const result = await claimToken(account.address, proxy, mobileProxieChangeUrl);

            if (result == true) {
                await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, true);

                const shuffledFirstFunctions = shuffle(firstFunctions);
                for (const func of shuffledFirstFunctions) {
                    await callWithRetries(func);
                }

                const shuffledSecondFunctions = shuffle(secondFunctions);
                for (const func of shuffledSecondFunctions) {
                    await callWithRetries(func);
                }

                const shuffledThirdFunctions = shuffle(thirdFunctions);
                for (const func of shuffledThirdFunctions) {
                    await callWithRetries(func);
                }

                if (RewardsConfig.isClaimRewards) {
                    const shuffledFourFunctions = shuffle(fourFunctions);
                    for (const func of shuffledFourFunctions) {
                        await callWithRetries(func);
                    }
                }

                if (DelegateConfig.isDelegate) {
                    const result = await delegateBGT(account);
                    if (result) {
                        await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, true);
                    } else {
                        await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, false);
                    }
                }

                if (DelegateConfig.isBoostValidator) {
                    const result = await boostValidatorBGT(account);
                    if (result) {
                        await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, true);
                    } else {
                        await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, false);
                    }
                }
            }

            //await bexSwapToStgUSDC(account, proxy); //       работает; 1
            // await bexSwapToBTCETH(account, proxy); //            работает;
            //await bexSwapToHoney(account, proxy); //работает

            //await addPoolNew(account, proxy); работает ->             await depositWBERAHONEY(account);
            // await honeyMintForUSDC(account); //работает 2

            // await bendSupply(account); //работает, щас боорроов еще сдлелать рандом 3

            // await bendBorrow(account); //работает рандом 3

            // await berpsFillVault(account); // работает 4 рандом ->    // await depositBHoneyStation(account); //работает 5

            // await claimBGTStation(account); // работает
            //await delegateBGT(account); // работает

            // await claimBGT(account);
            // await delegateBGT(account);
            // //await queryGalxe(account, null);
            // //await registerMail();

            // for (let i = modulesCount; i > 0; ) {
            //     const randomFunction = functions[Math.floor(Math.random() * functions.length)];
            //
            //     const result = await randomFunction(account);
            //     i--;
            //
            //     if (i != 0) {
            //         printInfo(`Осталось выполнить ${i} модулей на аккаунте\n`);
            //
            //         if (result == true) {
            //             await delay(Config.delayBetweenModules.minRange, Config.delayBetweenModules.maxRange, true);
            //         } else {
            //             await delay(Config.delayBetweenAction.minRange, Config.delayBetweenAction.maxRange, false);
            //         }
            //     }
            // }

            printSuccess(`Ended [${index + 1}/${count} - ${account.address}]\n`);

            await sendMessage();
            await resetTextMessage();

            fs.appendFile('../completed_accounts', `${line}\n`, 'utf8', (err) => {
                if (err) {
                    printError(`Произошла ошибка при записи в файл: ${err}`);
                }
            });

            index++;

            if (index == count) {
                printSuccess(`Все аккаунты отработаны`);
                rlPrivateKeys.close();
                await stopTelegramBot();
                return;
            }

            printInfo(`Ожидаю получение нового аккаунта`);

            if (result == false) {
                await delay(Config.DelayBetweenAccounts.min, Config.DelayBetweenAccounts.max, false); // tryue
            } else {
                await delay(Config.DelayBetweenAccounts.min, Config.DelayBetweenAccounts.max, true); // tryue
            }
        } catch (e) {
            printError(`Произошла ошибка при обработке строки: ${e}\n`);

            await addTextMessage(`❌Аккаунт отработал с ошибкой`);
            await sendMessage();
            await resetTextMessage();

            printInfo(`Ожидаю получение нового аккаунта`);
            await delay(Config.DelayBetweenAccounts.min, Config.DelayBetweenAccounts.max, false); // tryue

            fs.appendFile('../uncompleted_accounts', `${line}\n`, 'utf8', (err) => {
                if (err) {
                    printError(`Произошла ошибка при записи в файл: ${err}`);
                }
            });

            index++;
        }
    }
}

function getFileLines(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n');
}

function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function callWithRetries(func: () => Promise<boolean>, retries: number = Config.retryCount): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        const result = await func();
        if (result) {
            await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, true);
            return;
        } else {
            await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, false);
        }
    }
}

async function shuffleData() {
    try {
        const data1 = fs.readFileSync(privateKeysFilePath, 'utf8');
        const lines1 = data1.split('\n');

        for (let i = lines1.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines1[i], lines1[j]] = [lines1[j], lines1[i]];
        }

        await fs.writeFileSync(privateKeysFilePath, lines1.join('\n'), 'utf8');
    } catch (error) {
        printError(`Произошла ошибка во время перемешивания данных: ${error}`);
    }
}

start();
