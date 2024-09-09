import { createPublicClient, formatEther, Hex, http } from 'viem';
import axios from 'axios';
import { printError, printInfo, printSuccess } from '../logger/logger';
import { berachain, Config } from '../../config';
import { addTextMessage } from '../telegram/telegramBot';
import { delay } from './delayer';
import * as console from 'console';
import { IBexSteps, IRouteStep, ITokenInformation } from '../utils/interfaces';
import { HttpProxyAgent } from 'http-proxy-agent';
import {
    balanceEthLimit,
    balanceJsonData,
    captchaEndpoints,
    requestEndpoints,
    responseJsonData,
    taskJsonData,
} from './requesterData';
import { convertProxy } from '../utils/utils';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { mainnet } from 'viem/chains';

export async function claimToken(address: string, proxy: string = '', mobileProxyUrls: string[]) {
    let agent;

    const client = createPublicClient({
        chain: mainnet,
        transport: http(),
    });

    const balance = await client.getBalance({
        address: <`0x${string}`>address,
    });

    if (formatEther(balance) < formatEther(balanceEthLimit)) {
        printInfo(
            `Баланс ${formatEther(balance)} < ${formatEther(balanceEthLimit)} ETH, не выполняю модуль получения тестовых токенов\n`,
        );
        await addTextMessage(`❌Недостаточный баланс для получения токенов`);
        return false;
    }

    if (Config.IsClaimTap) {
        try {
            printInfo(`Выполняю модуль получения тестовых токенов\n`);

            if (Config.IsMobileProxy) {
                printInfo(`Использую мобильные прокси`);

                for (let i = 0; i < mobileProxyUrls.length; i++) {
                    const url = mobileProxyUrls[i];
                    printInfo(`Пробую ссылку для смены - ${url}`);
                    const result = await changeProxy(url);

                    if (result) {
                        agent = proxy.includes('http') ? new HttpsProxyAgent(proxy) : new SocksProxyAgent(proxy);
                        i = mobileProxyUrls.length;
                    } else {
                        await delay(5, 10, false);
                    }
                }
            } else if (proxy == '') {
                printInfo(`Прокси не будет использоваться`);
            } else {
                agent = proxy.includes('http') ? new HttpsProxyAgent(proxy) : new SocksProxyAgent(proxy);
                printInfo(`Использую статичные прокси - ${proxy}`);
            }
        } catch (err) {
            printError(`Произошла ошибка во время использование прокси - ${err}, proxy - ${proxy}`);
            return false;
        }
    } else {
        return false;
    }

    let solveResponse = await getCaptchaSolve();
    let currentTry = 0;

    while (currentTry <= Config.RetryCount) {
        if (currentTry == Config.RetryCount) {
            printError(
                `Не нашел баланса для свапа на BEX. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        const token = solveResponse!.data.solution.token;

        if (currentTry == Config.RetryCount) {
            printError(
                `Не удалось получить тестовые токены. Превышено количество попыток - [${currentTry}/${Config.RetryCount}]\n`,
            );

            return false;
        }

        const body = { address: address };

        const axiosInstance = axios.create({
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${token!}`,
            },
        });

        const getTokenResponse = await axiosInstance
            .post(`${requestEndpoints.getToken}`, body)
            .then(async (res) => {
                printSuccess(`Токены успешно получены, message - ${res.data.msg}`);
                await addTextMessage(`✅RuСaptcha: Solve captcha successfully`);
                await addTextMessage(`✅Faucet: Token successfully claimed `);

                return true;
            })
            .catch((err) => {
                let data;
                try {
                    console.log(err.response.data);
                    data = JSON.parse(err.response.data);
                } catch (e) {
                    console.log(err);
                    data = err.response.data;
                }

                if (typeof data === 'object' && 'msg' in data) {
                    printError(`Произошла ошибка во время получения токенов: ${data.msg}\n`);
                    return data.msg;
                } else {
                    printError(`Произошла ошибка во время получения токенов: ${data}`);
                    return data;
                }
            });

        if (getTokenResponse === true) {
            return true;
        }

        if (getTokenResponse.includes('You have exceeded the rate limit.')) {
            printError(`Токены уже получены на аккаунт - ${address}, proxy - ${proxy}`);
            return true;
        }

        currentTry++;
        solveResponse = await getCaptchaSolve();
    }

    printError(`Произошла ошибка во время решения капчи`);
    return true;
}

async function changeProxy(mobileProxy: string): Promise<boolean> {
    const routeRequest = await axios.get(mobileProxy, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        },
    });

    if (routeRequest.data.status === 'err' || routeRequest.data.status === 'ERR') {
        switch (routeRequest.data.message) {
            case 'Already change IP, please wait':
                printError('Already change IP, please wait.');
                break;
            case 'Error. Wrong proxy key #1':
                printError('Error. Wrong proxy key #1.');
                break;
            default:
                console.log(`${routeRequest.data}`);
                printError(`Ошибка: ${routeRequest.data.message}`);
        }
        return false;
    } else {
        printInfo(`Успешно получил новый прокси - ${routeRequest!.data.new_ip}`);
    }

    await delay(5, 10, false);

    return true;
}

async function getCaptchaSolve() {
    await axios
        .post(captchaEndpoints.getBalance, balanceJsonData)
        .then((res) => {
            printInfo(`Текущий баланс 2captcha: ${res.data.balance}`);
        })
        .catch((err) => {
            printError(`Произошла ошибка во время получения баланса: ${err}`);
        });

    const taskIdResponse = await axios.post(captchaEndpoints.createTask, responseJsonData);

    const getTaskResultJsonData = {
        clientKey: Config.RuCaptchaApi,
        taskId: taskIdResponse.data.taskId,
    };

    printInfo(`Жду получения решения капчи`);
    await delay(25, 25, false);

    let solveResponse = await axios.post(captchaEndpoints.getTaskResult, getTaskResultJsonData);

    while (solveResponse.data.status == 'processing') {
        printInfo(`Капча еще не решена`);
        await delay(15, 15, false);
        solveResponse = await axios.post(captchaEndpoints.getTaskResult, getTaskResultJsonData);
    }

    if (solveResponse.data.status == 'ready') {
        printInfo(`Капча успешно решена`);

        return solveResponse;
    }

    return;
}

export async function getRoute(fromAsset: Hex, toAsset: Hex, amount: bigint, proxy: string = ''): Promise<IBexSteps[]> {
    let axiosInstance;

    if (proxy === '') {
        axiosInstance = axios.create({
            headers: {
                accept: '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                origin: 'https://bartio.bex.berachain.com',
                priority: 'u=1, i',
                referer: 'https://bartio.bex.berachain.com/',
                'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            },
        });
    } else {
        const agent = convertProxy(proxy);
        axiosInstance = axios.create({
            ...agent,
            headers: {
                accept: '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                origin: 'https://bartio.bex.berachain.com',
                priority: 'u=1, i',
                referer: 'https://bartio.bex.berachain.com/',
                'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            },
        });
    }

    const routeRequest = await axiosInstance
        .get(`${requestEndpoints.getRoute}`, {
            params: {
                fromAsset: fromAsset,
                toAsset: toAsset,
                amount: amount,
            },
        })
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(`Произошла ошибка во время получения route - ${err}`);
            return null;
        });

    if (routeRequest !== null && 'data' in routeRequest) {
        return routeRequest!.data.steps;
    }

    return [];
}

export async function getTokenInformation(token: string, proxy: string = ''): Promise<ITokenInformation> {
    let axiosInstance;

    if (proxy === '') {
        axiosInstance = axios.create({
            headers: {
                accept: '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                origin: 'https://bartio.bex.berachain.com',
                priority: 'u=1, i',
                referer: 'https://bartio.bex.berachain.com/',
                'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            },
        });
    } else {
        const agent = convertProxy(proxy);
        axiosInstance = axios.create({
            ...agent,
            headers: {
                accept: '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                origin: 'https://bartio.bex.berachain.com',
                priority: 'u=1, i',
                referer: 'https://bartio.bex.berachain.com/',
                'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            },
        });
    }

    const response = await axiosInstance
        .post(
            'https://api.goldsky.com/api/public/project_clq1h5ct0g4a201x18tfte5iv/subgraphs/bgt-subgraph/v1000000/gn',
            {
                operationName: 'GetTokenInformation',
                variables: {
                    id: token,
                },
                query: 'query GetTokenInformation($id: String) {\n  tokenInformation(id: $id) {\n    id\n    address\n    symbol\n    name\n    decimals\n    usdValue\n    beraValue\n    __typename\n  }\n}',
            },
        )
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(`Произошла ошибка во время получения route - ${err}`);
            return null;
        });

    return {
        usdValue: response!.data.data.tokenInformation.usdValue,
        beraValue: response!.data.data.tokenInformation.beraValue,
    };
}
