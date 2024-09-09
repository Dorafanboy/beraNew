import {
    createPublicClient,
    createWalletClient,
    decodeFunctionData,
    decodeFunctionResult,
    encodeAbiParameters,
    encodeFunctionData,
    formatEther,
    formatUnits,
    fromHex,
    http,
    parseAbiParameters,
    parseEther,
    parseUnits,
    PrivateKeyAccount,
    PublicClient,
    SimulateContractReturnType,
    toHex,
    zeroAddress,
} from 'viem';
import { printError, printInfo, printSuccess } from '../../data/logger/logger';
import { getRoute, getTokenInformation } from '../../data/helpers/requester';
import { BendConfig, berachain, BerpsConfig, BexConfig, Config, HoneyConfig } from '../../config';
import { calculateRimmedAmount, getHexNumber, getValue, replaceDigitsWithZeros } from '../../data/utils/utils';
import { delay } from '../../data/helpers/delayer';
import {
    approveInfinity,
    assetOut,
    beraContractAddress,
    bexClaimRewardContract,
    bexContract,
    bexHoneyUsdcVault,
    BTCBERAPoolContract,
    deadline,
    honeyContract,
    stargateUSDContract,
    stargateUSDCwBERAPoolContract,
    stargateUSDCwBERAPoolId,
    stgUSDCHONEYPoolContract,
    stgUSDCwBERAPoolContract,
    swapPath,
    userData,
    vaultwBeraHoneyContractAddress,
    wBERAContract,
    wBeraHoneyLpContractAddress,
    wBERAHONEYPoolContract,
    wBTCContract,
    wETHContract,
} from './bexData';
import { addTextMessage } from '../../data/telegram/telegramBot';
import { bexABI } from '../../abis/bex';
import { erc20ABI } from '../../abis/erc20';
import * as console from 'console';
import { rewardsABI } from '../../abis/rewards';
import { bendContract } from '../bend/bendData';
import { bendABI } from '../../abis/bend';
import { IBexTokenData, IRewards } from '../../data/utils/interfaces';
import { bex2ABI } from '../../abis/bex2';
import { bexVaultABI } from '../../abis/bexVault';
import { berpsContract } from '../berps/berpsData';
import { berpsABI } from '../../abis/berps';
import { stationABI } from '../../abis/station';

export async function bexSwapToStgUSDC(account: PrivateKeyAccount, proxy: string = '') {
    printInfo(`Выполняю модуль swap на BEX ${swapPath[0]}`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести покупку ${swapPath[0]}`);

        value = await getValue(
            client,
            account.address,
            BexConfig.SellBeraSTGRange.range,
            BexConfig.SellBeraSTGRange.fixed,
            true,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    printInfo(`Произвожу покупку ${swapPath[0]} ${formatEther(value!)}`);
    const route = await getRoute(beraContractAddress, stargateUSDContract, value!, proxy);

    const tokenInformation = await getTokenInformation(stargateUSDContract.toString().toLowerCase(), proxy);
    const tokenInformationTwo = await getTokenInformation(beraContractAddress.toString().toLowerCase(), proxy);

    const multiplyValue =
        (Number(tokenInformationTwo.usdValue) * Number(formatUnits(value!, 18))) / Number(tokenInformation.usdValue);

    const minAmountOut = multiplyValue - multiplyValue * 0.05;

    printInfo(
        `Произвожу покупку ${minAmountOut.toFixed(6)} stgUSDC за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} `,
    );

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const data = encodeFunctionData({
        abi: bexABI,
        functionName: 'multiSwap',
        args: [
            [
                {
                    poolIdx: Number(route[0].poolIdx),
                    base: zeroAddress,
                    quote: stargateUSDContract,
                    isBuy: route[0].isBuy,
                },
            ],
            value,
            parseUnits(minAmountOut.toString(), 6),
        ],
    });

    const preparedTransaction = await walletClient
        .prepareTransactionRequest({
            account,
            to: bexContract,
            data: data,
            value: value,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля3525 ${swapPath[0]} swap на BEX - ${e}`);
            return undefined;
        });

    if (preparedTransaction != undefined) {
        const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля3525 ${swapPath[0]} swap на BEX - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля ${swapPath[0]} swap на BEX - ${e}`);
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
                        `✅BEX: swap ${minAmountOut.toFixed(6)} stgUSDC за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} <a href='${url}'>link</a>`,
                    );
                })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения модуля ${swapPath[0]} - ${e}`);
                    return { request: undefined };
                });

            return true;
        }
    }

    await addTextMessage(
        `❌BEX: swap ${minAmountOut.toFixed(6)} stgUSDC за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol}`,
    );

    return false;
}

export async function bexSwapToHoney(account: PrivateKeyAccount, proxy: string = '') {
    printInfo(`Выполняю модуль swap на BEX ${swapPath[2]}`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести покупку ${swapPath[2]}`);

        value = await getValue(
            client,
            account.address,
            BexConfig.SellBeraHoneyRange.range,
            BexConfig.SellBeraHoneyRange.fixed,
            true,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    printInfo(`Произвожу покупку ${swapPath[2]} ${formatEther(value!)}`);
    const route = await getRoute(beraContractAddress, honeyContract, value!, proxy);

    const tokenInformation = await getTokenInformation(honeyContract.toString().toLowerCase(), proxy);
    const tokenInformationTwo = await getTokenInformation(beraContractAddress.toString().toLowerCase(), proxy);

    const multiplyValue =
        (Number(tokenInformationTwo.usdValue) * Number(formatUnits(value!, 18))) / Number(tokenInformation.usdValue);

    const minAmountOut = multiplyValue - multiplyValue * 0.05;

    printInfo(
        `Произвожу покупку ${minAmountOut.toFixed(18)} HONEY за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} `,
    );

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const data = encodeFunctionData({
        abi: bexABI,
        functionName: 'multiSwap',
        args: [
            [
                {
                    poolIdx: Number(route[0].poolIdx),
                    base: honeyContract,
                    quote: zeroAddress,
                    isBuy: route[0].isBuy,
                },
            ],
            value,
            parseUnits(minAmountOut.toString(), 18),
        ],
    });

    const preparedTransaction = await walletClient
        .prepareTransactionRequest({
            account,
            to: bexContract,
            data: data,
            value: value,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля3525 ${swapPath[2]} swap на BEX - ${e}`);
            return undefined;
        });

    if (preparedTransaction != undefined) {
        const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля3525 ${swapPath[2]} swap на BEX - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля ${swapPath[2]} swap на BEX - ${e}`);
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
                        `✅BEX: swap ${minAmountOut.toFixed(18)} Honey за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} <a href='${url}'>link</a>`,
                    );
                })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения модуля ${swapPath[0]} - ${e}`);
                    return { request: undefined };
                });

            return true;
        }
    }

    await addTextMessage(
        `❌BEX: swap ${minAmountOut.toFixed(18)} Honey за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol}`,
    );

    return false;
}

export async function bexSwapToBTCETH(account: PrivateKeyAccount, proxy: string = '') {
    printInfo(`Выполняю модуль swap на BEX ${swapPath[1]}`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести покупку ${swapPath[1]}`);

        value = await getValue(
            client,
            account.address,
            BexConfig.SellBeraBTCETHRange.range,
            BexConfig.SellBeraBTCETHRange.fixed,
            true,
        );

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    printInfo(`Произвожу покупку ${swapPath[1]} ${formatEther(value!)}`);
    let tokenData: IBexTokenData;

    if (BexConfig.IsBuyETH && BexConfig.IsBuyBTC) {
        printInfo(`Включен режим покупки рандомного токена`);
        const randomBoolean = Math.random() > 0.5;
        if (randomBoolean) {
            tokenData = {
                tokenName: 'BTC',
                tokenAddress: wBTCContract,
                decimals: 8,
            };
        } else {
            tokenData = {
                tokenName: 'ETH',
                tokenAddress: wETHContract,
                decimals: 18,
            };
        }
    } else {
        if (BexConfig.IsBuyBTC) {
            tokenData = {
                tokenName: 'BTC',
                tokenAddress: wBTCContract,
                decimals: 8,
            };
        } else {
            tokenData = {
                tokenName: 'ETH',
                tokenAddress: wETHContract,
                decimals: 18,
            };
        }
    }

    printInfo(`Буду покупать токен - ${tokenData.tokenName}`);

    const route = await getRoute(beraContractAddress, tokenData.tokenAddress, value!, proxy);

    const tokenInformation = await getTokenInformation(tokenData.tokenAddress.toString().toLowerCase(), proxy);
    const tokenInformationTwo = await getTokenInformation(beraContractAddress.toString().toLowerCase(), proxy);

    const multiplyValue =
        (Number(Number(tokenInformationTwo.usdValue).toFixed(18)) * Number(formatUnits(value!, 18))) /
        Number(tokenInformation.usdValue);

    const minAmountOut = multiplyValue - multiplyValue * 0.2;

    printInfo(
        `Произвожу покупку ${minAmountOut.toFixed(tokenData.decimals)} ${tokenData.tokenName} за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} `,
    );

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const data = encodeFunctionData({
        abi: bexABI,
        functionName: 'multiSwap',
        args: [
            [
                {
                    poolIdx: Number(route[0].poolIdx),
                    base: tokenData.tokenName == 'BTC' ? tokenData.tokenAddress : zeroAddress,
                    quote: tokenData.tokenName == 'ETH' ? tokenData.tokenAddress : zeroAddress,
                    isBuy: route[0].isBuy,
                },
            ],
            value,
            parseUnits(minAmountOut.toString(), tokenData.decimals),
        ],
    });

    const preparedTransaction = await walletClient
        .prepareTransactionRequest({
            account,
            to: bexContract,
            data: data,
            value: value,
        })
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля3525 ${swapPath[1]} swap на BEX - ${e}`);
            return undefined;
        });

    if (preparedTransaction !== undefined) {
        const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
            printError(`Произошла ошибка во время выполнения модуля3525 ${swapPath[1]} swap на BEX - ${e}`);
            return undefined;
        });

        if (signature !== undefined) {
            const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
                printError(`Произошла ошибка во время выполнения модуля ${swapPath[1]} swap на BEX - ${e}`);
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
                        `✅BEX: swap ${minAmountOut.toFixed(tokenData.decimals)} ${tokenData.tokenName} за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol} <a href='${url}'>link</a>`,
                    );
                })
                .catch((e) => {
                    printError(`Произошла ошибка во время выполнения модуля ${swapPath[1]} - ${e}`);
                    return { request: undefined };
                });

            return true;
        }
    }

    await addTextMessage(
        `❌BEX: swap ${minAmountOut.toFixed(tokenData.decimals)} ${tokenData.tokenName} за ${formatUnits(value!, 18)} ${berachain.nativeCurrency.symbol}`,
    );
    return false;
}

export async function addPool(account: PrivateKeyAccount) {
    // printInfo(`Выполняю модуль add pool на BEX`);
    //
    // let currentTry: number = 0,
    //     firstToken,
    //     secondToken;
    //
    // let client!: PublicClient;
    //
    // let randomPool;
    // while (currentTry <= Config.RetryCount) {
    //     if (currentTry == Config.RetryCount) {
    //         printError(
    //             `Не нашел баланса для добавления в пул на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
    //         );
    //
    //         return false;
    //     }
    //
    //     const randomIndex = Math.floor(Math.random() * BexConfig.Pools.length);
    //     randomPool = BexConfig.Pools[randomIndex];
    //
    //     client = createPublicClient({
    //         chain: berachain,
    //         transport: http(berachain.rpcUrls.default.http.toString()),
    //     });
    //
    //     printInfo(`Пытаюсь найти баланс ${randomPool.firstTokenName} + ${randomPool.secondTokenName}`);
    //
    //     firstToken = await getValue(
    //         client,
    //         account.address,
    //         randomPool.firstTokenAmount.range,
    //         randomPool.firstTokenAmount.fixed,
    //         true,
    //     );
    //
    //     secondToken = await getValue(
    //         client,
    //         account.address,
    //         randomPool.secondTokenAmount.range,
    //         randomPool.secondTokenAmount.fixed,
    //         true,
    //     );
    //
    //     currentTry++;
    //
    //     if (firstToken != null && firstToken != BigInt(-1) && secondToken != null && secondToken != BigInt(-1)) {
    //         currentTry = Config.RetryCount + 1;
    //     } else {
    //         await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
    //     }
    // }
    //
    // const allowance = await client.readContract({
    //     address: randomPool!.firstTokenAddress,
    //     abi: erc20ABI,
    //     functionName: 'allowance',
    //     args: [account.address, randomPool!.toApprove],
    // });
    //
    // const walletClient = createWalletClient({
    //     chain: berachain,
    //     transport: http(berachain.rpcUrls.default.http.toString()),
    // });
    //
    // if (allowance < BigInt(firstToken!)) {
    //     const isInfinity = BexConfig.IsApproveInfinity;
    //
    //     printInfo(
    //         `Произвожу ${isInfinity ? 'infinity' : formatUnits(firstToken!, 18)} ${randomPool!.firstTokenName} approve`,
    //     );
    //
    //     const { request } = await client
    //         .simulateContract({
    //             address: randomPool!.firstTokenAddress,
    //             abi: erc20ABI,
    //             functionName: 'approve',
    //             args: [randomPool!.toApprove, isInfinity ? approveInfinity : firstToken!],
    //             account: account,
    //         })
    //         .then((request) => request as unknown as SimulateContractReturnType)
    //         .catch((e) => {
    //             printError(
    //                 `Произошла ошибка во время выполнения approve add pool ${randomPool!.firstTokenName} + ${randomPool!.secondTokenName} - ${e}`,
    //             );
    //             return { request: undefined };
    //         });
    //
    //     if (request !== undefined && request.account !== undefined) {
    //         const approveHash = await walletClient.writeContract(request).catch((e) => {
    //             printError(
    //                 `Произошла ошибка во время выполнения модуля add pool ${randomPool!.firstTokenName} + ${randomPool!.secondTokenName} - ${e}`,
    //             );
    //             return false;
    //         });
    //
    //         if (approveHash === false) {
    //             return false;
    //         }
    //
    //         const url = `${berachain.blockExplorers?.default.url + '/tx/' + approveHash}`;
    //
    //         printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);
    //
    //         await delay(Config.DelayBetweenModules.min, Config.DelayBetweenModules.max, true);
    //     }
    // }
    //
    // printInfo(
    //     `Произвожу добавление в пул ${formatUnits(firstToken!, 18)} ${randomPool!.firstTokenName} + ${formatUnits(secondToken!, 18)} ${randomPool!.secondTokenName} `,
    // );
    //
    // const data = encodeFunctionData({
    //     abi: bexABI,
    //     functionName: 'addLiquidity',
    //     args: [
    //         randomPool!.poolAddress,
    //         account.address,
    //         [randomPool!.firstTokenAddress, randomPool!.secondTokenAddress],
    //         [firstToken!, secondToken!],
    //     ],
    // });
    //
    // const preparedTransaction = await walletClient!.prepareTransactionRequest({
    //     account,
    //     to: bexContract,
    //     data: data,
    //     value: secondToken,
    // });
    //
    // const signature = await walletClient.signTransaction(preparedTransaction).catch((e) => {
    //     printError(
    //         `Произошла ошибка во время выполнения модуля add liquidity ${randomPool!.firstTokenName} + ${randomPool!.secondTokenName} на BEX - ${e}`,
    //     );
    //     return undefined;
    // });
    //
    // if (signature !== undefined) {
    //     const hash = await walletClient.sendRawTransaction({ serializedTransaction: signature }).catch((e) => {
    //         printError(
    //             `Произошла ошибка во время выполнения add liquidity ${randomPool!.firstTokenName} + ${randomPool!.secondTokenName} на BEX - ${e}`,
    //         );
    //         return false;
    //     });
    //
    //     if (hash == false) {
    //         return false;
    //     }
    //
    //     const url = `${berachain.blockExplorers?.default.url + '/tx/' + hash}`;
    //
    //     printSuccess(`Транзакция успешно отправлена. Хэш транзакции: ${url}\n`);
    //
    //     await addTextMessage(
    //         `✅BEX: add liquidity ${formatUnits(firstToken!, 18)} ${randomPool!.firstTokenName} + ${formatUnits(secondToken!, 18)} ${randomPool!.secondTokenName} <a href='${url}'>link</a>`,
    //     );
    //
    //     return true;
    // }
    //
    // return false;
}

export async function claimBGT(account: PrivateKeyAccount) {
    // printInfo(`Выполняю модуль claim BGT reward на BEX`);
    //
    // let publicClient!: PublicClient;
    // publicClient = createPublicClient({
    //     chain: berachain,
    //     transport: http(berachain.rpcUrls.default.http.toString()),
    // });
    //
    // let currentRewards, amount, foundPool;
    // for (const pool of BexConfig.Pools) {
    //     currentRewards = (await publicClient.readContract({
    //         address: bexClaimRewardContract,
    //         abi: rewardsABI,
    //         functionName: 'getCurrentRewards',
    //         args: [account.address, pool.poolAddress],
    //     })) as IRewards[];
    //
    //     if (currentRewards.length == 0) {
    //         amount = BigInt(0);
    //     } else {
    //         amount = currentRewards[0].amount;
    //     }
    //
    //     if (amount > BigInt(0)) {
    //         foundPool = pool;
    //         break;
    //     }
    // }
    //
    // if (amount == BigInt(0)) {
    //     printInfo(`Не было найдено пула для забирания наград`);
    //     return false;
    // }
    //
    // const fullBalanceReward = amount;
    // const isFullBalance =
    //     BexConfig.ClaimBGTRewardPercent.range.max == 1 && BexConfig.ClaimBGTRewardPercent.range.min == 1;
    //
    // const randomFixed = Math.floor(
    //     Math.random() * (BexConfig.ClaimBGTRewardPercent.fixed.max - BexConfig.ClaimBGTRewardPercent.fixed.min) +
    //         BexConfig.ClaimBGTRewardPercent.fixed.min,
    // );
    //
    // const randomPercent =
    //     Math.random() * (BexConfig.ClaimBGTRewardPercent.range.max - BexConfig.ClaimBGTRewardPercent.range.min) +
    //     BexConfig.ClaimBGTRewardPercent.range.min;
    //
    // const honeyRimmed =
    //     randomPercent == 1 ? 0.01 : randomPercent + 0.01 == 1 ? 0.01 : Number((1 - randomPercent).toFixed(2));
    //
    // amount = replaceDigitsWithZeros(calculateRimmedAmount(amount!, honeyRimmed), randomFixed);
    //
    // printInfo(
    //     `Произвожу забирание ${isFullBalance ? formatUnits(fullBalanceReward!, 18) : formatUnits(amount, 18)} BGT из пула ${foundPool!.firstTokenName} + ${foundPool!.secondTokenName}`,
    // );
    //
    // let client!: PublicClient;
    // client = createPublicClient({
    //     chain: berachain,
    //     transport: http(berachain.rpcUrls.default.http.toString()),
    // });
    //
    // const walletClient = createWalletClient({
    //     chain: berachain,
    //     transport: http(berachain.rpcUrls.default.http.toString()),
    // });
    //
    // const args = isFullBalance ? [foundPool!.poolAddress] : [foundPool!.poolAddress, amount]; // адрес пула который найду
    //
    // const functionName = isFullBalance ? 'withdrawAllDepositorRewards' : 'withdrawDepositorRewards';
    //
    // const { request } = await client
    //     .simulateContract({
    //         abi: rewardsABI,
    //         address: bexClaimRewardContract,
    //         functionName: functionName,
    //         args: args,
    //         account: account,
    //     })
    //     .then((request) => request as unknown as SimulateContractReturnType)
    //     .catch((e) => {
    //         printError(`Произошла ошибка во время выполнения claim BGT reward на BEX - ${e}`);
    //         return { request: undefined };
    //     });
    //
    // if (request !== undefined && request.account !== undefined) {
    //     const hash = await walletClient.writeContract(request).catch((e) => {
    //         printError(`Произошла ошибка во время выполнения claim BGT reward на BEX - ${e}`);
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
    //     await addTextMessage(
    //         `✅BEX: claim ${isFullBalance ? formatUnits(fullBalanceReward!, 18) : formatUnits(amount, 18)} BGT из пула ${foundPool!.firstTokenName} + ${foundPool!.secondTokenName} <a href='${url}'>link</a>`,
    //     );
    //
    //     return true;
    // }
    //
    // return false;
}

export async function addPoolNew(account: PrivateKeyAccount, proxy: string) {
    printInfo(`Выполняю модуль добавления в LP WBERA + HONEY`);

    let currentTry: number = 0,
        value;

    let client!: PublicClient;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для добавления в vLP WBERA + HONEY. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        client = createPublicClient({
            chain: berachain,
            transport: http(berachain.rpcUrls.default.http.toString()),
        });

        printInfo(`Пытаюсь произвести добавление в LP WBERA + HONEY `);

        value = await getValue(client, account.address, BexConfig.AddPools.range, BexConfig.AddPools.fixed, true);

        currentTry++;

        if (value != null && value != BigInt(-1)) {
            currentTry = Config.RetryCount + 1;
        } else {
            await delay(Config.DelayBetweenAction.min, Config.DelayBetweenAction.max, false);
        }
    }

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    printInfo(`Произвожу добавление в LP WBERA + HONEY ${formatUnits(value!, 18)} HONEY`);

    const allowance = await client.readContract({
        address: honeyContract,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, bexHoneyUsdcVault],
    });

    if (allowance < BigInt(value!)) {
        const isInfinity = BexConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(value!, 18)} HONEY approve`);

        const { request } = await client
            .simulateContract({
                address: honeyContract,
                abi: erc20ABI,
                functionName: 'approve',
                args: [bexHoneyUsdcVault, isInfinity ? approveInfinity : value!],
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

    const tokenInformation = await getTokenInformation(beraContractAddress.toString().toLowerCase(), proxy);
    const result = getHexNumber(Number(Number(tokenInformation.usdValue).toFixed(14)), 18, 18);

    const data = encodeAbiParameters(
        parseAbiParameters('uint8,address,address,uint24,int24,int24,uint128,uint128,uint128,uint8,address'),
        [
            32,
            <`0x${string}`>honeyContract.toLowerCase(),
            zeroAddress,
            36000,
            0,
            0,
            value as bigint,
            BigInt(result[0]),
            BigInt(result[1]),
            0,
            wBeraHoneyLpContractAddress,
        ],
    );

    const { request } = await client
        .simulateContract({
            abi: bexVaultABI,
            address: bexHoneyUsdcVault,
            functionName: 'userCmd',
            args: [128, data],
            account: account,
            value: value,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения deposit WBERA + HONEY - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения deposit WBERA + HONEY - ${e}`);
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
                await addTextMessage(
                    `✅BEX: deposit ${formatUnits(value!, 18)} WBERA + HONEY <a href='${url}'>link</a>`,
                );
            })
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения deposit WBERA + HONEY - ${e}`);
                return { request: undefined };
            });

        return true;
    }

    await addTextMessage(`❌BEX: deposit ${formatUnits(value!, 18)} WBERA + HONEY`);
    return false;
}

export async function depositWBERAHONEY(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль добавления в LP WBERA + HONEY`);

    const client = createPublicClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    const balance = await client.readContract({
        address: wBeraHoneyLpContractAddress,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [account.address],
    });

    const walletClient = createWalletClient({
        chain: berachain,
        transport: http(berachain.rpcUrls.default.http.toString()),
    });

    printInfo(`Произвожу добавление в VAULT WBERAHONEY ${formatUnits(balance!, 18)} WBERAHONEY`);

    const allowance = await client.readContract({
        address: wBeraHoneyLpContractAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [account.address, vaultwBeraHoneyContractAddress],
    });

    if (allowance < BigInt(balance!)) {
        const isInfinity = BexConfig.IsApproveInfinity;

        printInfo(`Произвожу ${isInfinity ? 'infinity' : formatUnits(balance!, 18)} WBERAHONEY approve`);

        const { request } = await client
            .simulateContract({
                address: wBeraHoneyLpContractAddress,
                abi: erc20ABI,
                functionName: 'approve',
                args: [vaultwBeraHoneyContractAddress, isInfinity ? approveInfinity : balance!],
                account: account,
            })
            .then((request) => request as unknown as SimulateContractReturnType)
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения approve WBERAHONEY - ${e}`);
                return { request: undefined };
            });

        if (request !== undefined && request.account !== undefined) {
            const approveHash = await walletClient.writeContract(request).catch((e) => {
                printError(`Произошла ошибка во время выполнения approve WBERAHONEY - ${e}`);
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
            address: vaultwBeraHoneyContractAddress,
            functionName: 'stake',
            args: [balance],
            account: account,
        })
        .then((request) => request as unknown as SimulateContractReturnType)
        .catch((e) => {
            printError(`Произошла ошибка во время выполнения deposit to vault WBERAHONEY - ${e}`);
            return { request: undefined };
        });

    if (request !== undefined && request.account !== undefined) {
        const hash = await walletClient.writeContract(request).catch((e) => {
            printError(`Произошла ошибка во время выполнения deposit to vault WBERAHONEY - ${e}`);
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
                await addTextMessage(
                    `✅STATION: deposit to vault ${formatUnits(balance!, 18)} WBERAHONEY <a href='${url}'>link</a>`,
                );
            })
            .catch((e) => {
                printError(`Произошла ошибка во время выполнения deposit to vault WBERAHONEY - ${e}`);
                return { request: undefined };
            });

        return true;
    }

    await addTextMessage(`❌STATION: deposit to vault ${formatUnits(balance!, 18)} WBERAHONEY`);
    return false;
}
