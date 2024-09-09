import {
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    formatEther,
    formatUnits,
    http,
    PrivateKeyAccount,
    PublicClient,
    SimulateContractReturnType,
} from 'viem';
import { printError, printInfo, printSuccess } from '../../data/logger/logger';
import { berachain, Config, HoneyConfig, StationConfig } from '../../config';
import { addTextMessage } from '../../data/telegram/telegramBot';
import {
    bendRewardContractAddress,
    bgtBalanceToken,
    bHoneyContractAddress,
    bHoneyVaultStation,
    stationContract,
    validators,
} from './stationData';
import { erc20ABI } from '../../abis/erc20';
import { berpsABI } from '../../abis/berps';
import { approveInfinity, vaultwBeraHoneyContractAddress } from '../bex/bexData';
import { getValue } from '../../data/utils/utils';
import { delay } from '../../data/helpers/delayer';
import { stationABI } from '../../abis/station';
import { stationBoostABI } from '../../abis/stationBoost';
import { loadData, saveData } from '../jsonWorker/jsonWorker';
import { bgtABI } from '../../abis/bgt';

export async function depositBHoneyStation(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль deposit BHONEY на Station`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для deposit на Station. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести deposit BHONEY на Station`);

        value = await getValue(
            client,
            account.address,
            StationConfig.bHoneyDepositRange.range,
            StationConfig.bHoneyDepositRange.fixed,
            true,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    printInfo(`Произвожу deposit ${formatUnits(value!, 18)} BHONEY на Station`);

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const allowance = await client.readContract({
        address: bHoneyContractAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, bHoneyVaultStation],
    });

    if (allowance < BigInt(value!)) {
        const isInfinity = HoneyConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(value!, 18)} bHONEY approve`);

        const { request } = await client
            .simulateContract({
                address: bHoneyContractAddress,
                abi: erc20ABI,
                functionName: 'approve',
                args: [bHoneyVaultStation, isInfinity ? approveInfinity : value!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve bHONEY - ${e}`);
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(`Произошла ошибка во время выполнения approve bHONEY - ${e}`);
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

    const { request } = await client
        .simulateContract({
            abi: stationABI,
            address: bHoneyVaultStation,
            functionName: 'stake',
            args: [value!],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения deposit bHONEY - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения deposit bHONEY - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        const transaction = await client
            .waitForTransactionReceipt({ hash: <`0x${string}`>hash })
            .then(async (result) => {
                printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);
                await addTextMessage(`✅STATION: deposit ${formatEther(value!)} bHONEY <a href='${url}'>link</a>`);
            })
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения deposit bHONEY - ${e}`);
                return { request: undefined };
            });

        return true;
    }

    await addTextMessage(`❌STATION: deposit ${formatEther(value!)} bHONEY`);

    return false;
}

export async function claimBGTStationbHoney(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль claim BGT на Station bHONEY`);

    let client!: PublicClient;

    client = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    printInfo(`Произвожу claim BGT на Station bHONEY`);

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const { request } = await client
        .simulateContract({
            abi: stationABI,
            address: bHoneyVaultStation,
            functionName: 'getReward',
            args: [account.address],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения claim BGT на Station bHONEY - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения claim BGT на Station bHONEY - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(`✅STATION: claim BGT за bHONEY <a href='${url}'>link</a>`);

        return true;
    }

    return false;
}

export async function claimBGTStationwBeraHoney(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль claim BGT на Station wBERAHONEY`);

    let client!: PublicClient;

    client = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    printInfo(`Произвожу claim BGT на Station wBERAHONEY`);

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const { request } = await client
        .simulateContract({
            abi: stationABI,
            address: vaultwBeraHoneyContractAddress,
            functionName: 'getReward',
            args: [account.address],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения claim BGT на Station wBERAHONEY - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения claim BGT на Station wBERAHONEY - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(`✅STATION: claim BGT за wBERAHONEY <a href='${url}'>link</a>`);

        return true;
    }

    return false;
}

export async function claimBGTStationBend(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль claim BGT на Station BEND`);

    let client!: PublicClient;

    client = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    printInfo(`Произвожу claim BGT на Station BEND`);

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const { request } = await client
        .simulateContract({
            abi: stationABI,
            address: bendRewardContractAddress,
            functionName: 'getReward',
            args: [account.address],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения claim BGT на Station BEND - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения claim BGT на Station BEND - ${e}`);
            return false;
        });

        if (hash === false) {
            return false;
        }

        const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

        printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);

        await addTextMessage(`✅STATION: claim BGT на BEND <a href='${url}'>link</a>`);

        return true;
    }

    return false;
}

export async function delegateBGT(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль делегирование BGT на STATION`);

    let publicClient!: PublicClient;
    publicClient = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const amount = await publicClient.readContract({
        address: bgtBalanceToken,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account.address],
    });

    if (amount == BigInt(0)) {
        printInfo(`Баланс BGT равен нулю, нечего делегировать.`);
        return false;
    }

    const randomValidator = validators[Math.floor(Math.random() * validators.length)];

    printInfo(`Произвожу делегирование ${formatUnits(amount, 18)} BGT, validator - ${randomValidator}`);

    const data = encodeFunctionData({
        abi: stationBoostABI,
        functionName: 'queueBoost',
        args: [randomValidator, amount],
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const preparedTransaction = await walletClient
        .prepareTransactionRequest({
            account,
            to: stationContract,
            data: data,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения делегирование BGT на STATION - ${e}`);
            return undefined;
        });

    if (preparedTransaction != undefined) {
        const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
            printError(`Произошла ошибка во время выполнения делегирование BGT на STATION - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
                printError(`Произошла ошибка во время выполнения делегирование BGT на STATION - ${e}`);
                return false;
            });

            if (hash == false) {
                return false;
            }

            const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

            const transaction = await publicClient
                .waitForTransactionReceipt({ hash: <`0x${string}`>hash })
                .then(async (result) => {
                    printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);
                    await addTextMessage(
                        `✅STATION: delegate ${formatUnits(amount!, 18)} BGT validator - ${randomValidator} <a href='${url}'>link</a>`,
                    );
                    saveData({
                        accountAddress: account.address,
                        delegateAddress: randomValidator,
                    });
                })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения делегирование BGT на STATION - ${e}`);
                    return { request: undefined };
                });

            return true;
        }
    }

    return false;
}

export async function boostValidatorBGT(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль boost BGT на STATION`);

    let publicClient!: PublicClient;
    publicClient = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const loadedData = await loadData(account.address);

    if (loadedData == null) {
        printError(`Не найден адрес для буста`);
        return false;
    }

    printInfo(`Произвожу boost BGT, validator - ${loadedData.delegateAddress}`);

    const data = encodeFunctionData({
        abi: bgtABI,
        functionName: 'activateBoost',
        args: [loadedData.delegateAddress],
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const preparedTransaction = await walletClient
        .prepareTransactionRequest({
            account,
            to: bgtBalanceToken,
            data: data,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения boost BGT на STATION - ${e}`);
            return undefined;
        });

    if (preparedTransaction != undefined) {
        const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
            printError(`Произошла ошибка во время выполнения boost BGT на STATION - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
                printError(`Произошла ошибка во время выполнения boost BGT на STATION - ${e}`);
                return false;
            });

            if (hash == false) {
                return false;
            }

            const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;

            const transaction = await publicClient
                .waitForTransactionReceipt({ hash: <`0x${string}`>hash })
                .then(async (result) => {
                    printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);
                    await addTextMessage(
                        `✅STATION: boost to validator ${loadedData.delegateAddress} <a href='${url}'>link</a>`,
                    );
                })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения boost BGT на STATION - ${e}`);
                    return { request: undefined };
                });

            return true;
        }
    }

    return false;
}
