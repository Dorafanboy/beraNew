import {
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    formatUnits,
    http,
    parseUnits,
    PrivateKeyAccount,
    PublicClient,
    SimulateContractReturnType,
    zeroAddress,
} from 'viem';
import { printError, printInfo, printSuccess } from '../../data/logger/logger';
import {
    approveInfinity,
    bexContract,
    honeyContract,
    honeyContractMint,
    stargateUSDContract,
    swapPath,
} from '../bex/bexData';
import { berachain, Config, HoneyConfig } from '../../config';
import { getValue } from '../../data/utils/utils';
import { delay } from '../../data/helpers/delayer';
import { erc20ABI } from '../../abis/erc20';
import { honeyABI } from '../../abis/honey';
import * as console from 'console';
import { addTextMessage } from '../../data/telegram/telegramBot';
import { bexABI } from '../../abis/bex';

export async function honeyMintForUSDC(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль swap на HONEY ${swapPath[3]}`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на HONEY. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести покупку ${swapPath[3]}`);

        value = await getValue(
            client,
            account.address,
            HoneyConfig.SellSTGHONEYRange.range,
            HoneyConfig.SellSTGHONEYRange.fixed,
            false,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const allowance = await client.readContract({
        address: stargateUSDContract,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, honeyContractMint],
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    if (allowance < BigInt(value!)) {
        const isInfinity = HoneyConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(value!, 6)} stgUSDC approve`);

        const { request } = await client
            .simulateContract({
                address: stargateUSDContract,
                abi: erc20ABI,
                functionName: 'approve',
                args: [honeyContractMint, isInfinity ? approveInfinity : value!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve stgUSDC - ${e}`);
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(`Произошла ошибка во время выполнения approve stgUSDC - ${e}`);
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

    printInfo(`Произвожу покупку HONEY на ${formatUnits(value!, 6)} stgUSDC `);

    const data = encodeFunctionData({
        abi: honeyABI,
        functionName: 'mint',
        args: [stargateUSDContract, value!, account.address],
    });

    const preparedTransaction = await walletClient
        .prepareTransactionRequest({
            account,
            to: honeyContractMint,
            data: data,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения honey mint ${swapPath[3]} swap на BEX - ${e}`);
            return undefined;
        });

    if (preparedTransaction != undefined) {
        const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
            printError(`Произошла ошибка во время выполнения honey mint ${swapPath[3]} swap на BEX - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
                printError(`Произошла ошибка во время выполнения honey mint ${swapPath[3]} swap на BEX - ${e}`);
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
                    await addTextMessage(
                        `✅HONEY: swap ${formatUnits(value!, 6)} stgUSDC на HONEY <a href='${url}'>link</a>`,
                    );
                })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения модуля ${swapPath[0]} - ${e}`);
                    return { request: undefined };
                });

            return true;
        }
    }

    await addTextMessage(`❌HONEY: swap ${formatUnits(value!, 6)} stgUSDC на HONEY`);

    // const { request } = await client
    //     .simulateContract({
    //         address: honeyContract,
    //         abi: honeyABI,
    //         functionName: 'mint',
    //         args: [stargateUSDContract, value!, account.address],
    //         account: account,
    //     })
    //     .then((request) => request as unknown as SimulateContractReturnType)
    //     .catch((e) => {
    //         printError(`Произошла ошибка во время выполнения модуля swap на HONEY ${swapPath[3]} - ${e}`);
    //         return { request: undefined };
    //     });
    //
    // if (request !== undefined && request.account !== undefined) {
    //     const hash = await walletClient.writeContract(request).catch((e) => {
    //         printError(`Произошла ошибка во время выполнения модуля swap на HONEY ${swapPath[3]} - ${e}`);
    //         return false;
    //     });
    //
    //     if (hash === false) {
    //         return false;
    //     }
    //
    //     const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;
    //
    //     printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);
    //
    //     await addTextMessage(`✅HONEY: swap ${formatUnits(value!, 18)} stgUSDC на HONEY <a href='${url}'>link</a>`);
    //
    //     return true;
    // }

    return false;
}
