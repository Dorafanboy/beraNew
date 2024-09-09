import {
    createPublicClient,
    createWalletClient,
    decodeFunctionData,
    encodeFunctionData,
    encodeFunctionResult,
    formatEther,
    formatUnits,
    getContract,
    http,
    parseAbi,
    parseEther,
    parseUnits,
    PrivateKeyAccount,
    PublicClient,
    SimulateContractReturnType,
    zeroAddress,
} from 'viem';
import { printError, printInfo, printSuccess } from '../../data/logger/logger';
import {
    approveInfinity,
    assetOut,
    bexContract,
    deadline,
    honeyContract,
    stargateUSDContract,
    stargateUSDCwBERAPoolId,
    swapPath,
    userData,
    wBTCContract,
    wETHContract,
} from '../bex/bexData';
import { BendConfig, berachain, Config, HoneyConfig } from '../../config';
import { calculateRimmedAmount, convertEtherView, getValue, replaceDigitsWithZeros } from '../../data/utils/utils';
import { delay } from '../../data/helpers/delayer';
import { erc20ABI } from '../../abis/erc20';
import { honeyABI } from '../../abis/honey';
import * as console from 'console';
import { addTextMessage } from '../../data/telegram/telegramBot';
import { bendContract } from './bendData';
import { bendABI } from '../../abis/bend';
import { bexABI } from '../../abis/bex';
import { bendBorrowABI } from '../../abis/bendBorrow';

export async function bendSupply(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль supply на BEND`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для закидывания HONEY на BEND. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести закидывание HONEY на BEND`);

        value = await getValue(
            client,
            account.address,
            BendConfig.honeyDepositRange.range,
            BendConfig.honeyDepositRange.fixed,
            true,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const allowance = await client.readContract({
        address: honeyContract,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, bendContract],
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    if (allowance < BigInt(value!)) {
        const isInfinity = BendConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(value!, 18)} HONEY approve`);

        const { request } = await client
            .simulateContract({
                address: honeyContract,
                abi: erc20ABI,
                functionName: 'approve',
                args: [bendContract, isInfinity ? approveInfinity : value!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve HONEY - ${e}`);
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(`Произошла ошибка во время выполнения approve HONEY - ${e}`);
                return false;
            });

            if (approveHash === false) {
                return false;
            }

            const url = `${berachain.blockExplorers?.default.url + '/tx/' + approveHash}`;

            printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

            await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, true);
        }
    }

    printInfo(`Произвожу закидывание ${formatUnits(value!, 18)} HONEY`);

    const data = encodeFunctionData({
        abi: bendABI,
        functionName: 'supply',
        args: [honeyContract, value!, account.address, 18],
    });

    const preparedTransaction = await walletClient
        .prepareTransactionRequest({
            account,
            to: bendContract,
            data: data,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля borrow на BEND - ${e}`);
            return undefined;
        });

    if (preparedTransaction != undefined) {
        const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля borrow на BEND - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля borrow на BEND - ${e}`);
                return false;
            });

            if (hash == false) {
                return false;
            }

            const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

            const transaction = await client
                .waitForTransactionReceipt({ hash: <`0x${string}`>hash })
                .then(async (result) => {
                    printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);
                    await addTextMessage(`✅BEND: supply ${formatUnits(value!, 18)} HONEY <a href='${url}'>link</a>`);
                })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения модуля borrow на BEND - ${e}`);
                    return { request: undefined };
                });

            return true;
        }
    }

    await addTextMessage(`❌BEND: supply ${formatUnits(value!, 18)} HONEY`);

    return false;
}

export async function bendBorrow(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль borrow HONEY Bend`);

    let publicClient!: PublicClient;
    publicClient = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const accountData = await publicClient.readContract({
        address: bendContract,
        abi: bendBorrowABI,
        functionName: 'getUserAccountData',
        args: [account.address],
    });

    let [, , availableBorrowsBase] = accountData as bigint[]; // процент забрать

    const fixedInBorrows = availableBorrowsBase.toString().length;

    const randomFixed = Math.floor(
        Math.random() * (BendConfig.HoneyBorrowPercentRange.fixed.max - BendConfig.HoneyBorrowPercentRange.fixed.min) +
            BendConfig.HoneyBorrowPercentRange.fixed.min,
    );

    const randomPercent = Math.floor(
        Math.random() * (BendConfig.HoneyBorrowPercentRange.range.max - BendConfig.HoneyBorrowPercentRange.range.min) +
            BendConfig.HoneyBorrowPercentRange.range.min,
    );

    const honeyRimmed =
        randomPercent == 1 ? 0.01 : randomPercent + 0.01 == 1 ? 0.01 : Number((1 - randomPercent).toFixed(2));

    availableBorrowsBase =
        randomPercent == 100
            ? availableBorrowsBase
            : replaceDigitsWithZeros(
                  calculateRimmedAmount(availableBorrowsBase, 18 - fixedInBorrows, honeyRimmed),
                  randomFixed,
                  18 - fixedInBorrows,
              );

    let client!: PublicClient;
    client = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    printInfo(
        `Произвожу занимание ${formatEther(parseUnits(availableBorrowsBase!.toString(), 18 - fixedInBorrows))} HONEY`,
    );

    const { request } = await client
        .simulateContract({
            address: bendContract,
            abi: bendBorrowABI,
            functionName: 'borrow',
            args: [
                honeyContract,
                parseUnits(availableBorrowsBase!.toString(), 18 - fixedInBorrows),
                BigInt(2),
                0,
                account.address,
            ],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения borrow HONEY - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения borrow HONEY - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(
            `✅BEND: borrow ${formatEther(parseUnits(availableBorrowsBase!.toString(), 18 - fixedInBorrows))} HONEY <a href='${url}'>link</a>`,
        );

        return true;
    }

    return false;
}

export async function bendSupplyETH(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль supply на BEND ETH`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для закидывания ETH на BEND. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести закидывание BEND ETH`);

        value = await getValue(
            client,
            account.address,
            BendConfig.ethDepositRange.range,
            BendConfig.ethDepositRange.fixed,
            true,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const allowance = await client.readContract({
        address: wETHContract,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, bendContract],
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    if (allowance < BigInt(value!)) {
        const isInfinity = BendConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(value!, 18)} ETH approve`);

        const { request } = await client
            .simulateContract({
                address: wETHContract,
                abi: erc20ABI,
                functionName: 'approve',
                args: [bendContract, isInfinity ? approveInfinity : value!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve ETH - ${e}`);
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(`Произошла ошибка во время выполнения approve ETH - ${e}`);
                return false;
            });

            if (approveHash === false) {
                return false;
            }

            const url = `${berachain.blockExplorers?.default.url + '/tx/' + approveHash}`;

            printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

            await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, true);
        }
    }

    printInfo(`Произвожу закидывание ${formatUnits(value!, 18)} ETH`);

    const data = encodeFunctionData({
        abi: bendABI,
        functionName: 'supply',
        args: [wETHContract, value!, account.address, 18],
    });

    const preparedTransaction = await walletClient
        .prepareTransactionRequest({
            account,
            to: bendContract,
            data: data,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля borrow на BEND ETH - ${e}`);
            return undefined;
        });

    if (preparedTransaction != undefined) {
        const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля borrow на BEND ETH - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля borrow на BEND ETH - ${e}`);
                return false;
            });

            if (hash == false) {
                return false;
            }

            const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

            const transaction = await client
                .waitForTransactionReceipt({ hash: <`0x${string}`>hash })
                .then(async (result) => {
                    printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);
                    await addTextMessage(`✅BEND: supply ${formatUnits(value!, 18)} ETH <a href='${url}'>link</a>`);
                })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения модуля borrow на BEND ETH - ${e}`);
                    return { request: undefined };
                });

            return true;
        }
    }

    await addTextMessage(`❌BEND: supply ${formatUnits(value!, 18)} ETH`);

    return false;
}
