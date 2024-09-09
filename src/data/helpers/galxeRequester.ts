import axios, { AxiosInstance } from 'axios';
import { printError, printInfo } from '../logger/logger';
import {
    campaignIDs,
    createNewAccount,
    credIDs,
    errors,
    galxeRequestEndpoints,
    getAddTypedCredentialItems,
    getAuthBody,
    getBasicUserInfoWithAddress,
    getCampaignDetailAll,
    getCampaignParticipants,
    getIsUserNameExist,
    getPrepareParticipate,
    getSendVerifyCode,
    getSpaceAccessQuery,
    getSyncCredentialValue,
    getSyncCredentialValueQuiz,
    getUpdateEmail,
} from './galxeRequesterData';
import { generateRandomNickName, getMessage, registerMail } from '../utils/utils';
import { PrivateKeyAccount } from 'viem';
import { delay } from './delayer';
import { addTextMessage } from '../telegram/telegramBot';

export async function getAuthToken(account: PrivateKeyAccount) {
    printInfo(`Выполняю модуль авторизирования в galxe.`);
    const message = getMessage(account.address);

    const signature = await account.signMessage({
        message: message,
    });

    const authBody = getAuthBody(account.address, message, signature);

    const quoteRequest = await axios
        .post(galxeRequestEndpoints.query, authBody)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(`Произошла ошибка во время выполнения query auth token - ${err}`);
            return null;
        });

    printInfo(`Успешно авторизировался на galxe.`);

    return quoteRequest!.data.data.signin;
}

export async function queryClaimDaily(account: PrivateKeyAccount, axiosInstance: AxiosInstance) {
    printInfo(`Выполняю модуль daily galxe.\n`);

    const typedCredentialItemsBody = await getAddTypedCredentialItems(
        account.address,
        credIDs.daily,
        campaignIDs.daily,
    );

    const typedCredentialItemsResponse = await axiosInstance
        .post(galxeRequestEndpoints.query, typedCredentialItemsBody)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(`Произошла ошибка во время выполнения typedCredentialItems claimDaily - ${err}`);
            return null;
        });

    if (
        'errors' in typedCredentialItemsResponse!.data &&
        typedCredentialItemsResponse!.data.errors[0].message == errors.wTimeError
    ) {
        printError(`W - истекло время использования, смените`);
        throw `W - истекло время использования, смените`;
    }

    const syncCredentialValueBody = getSyncCredentialValue(account.address, credIDs.daily);

    const syncCredentialValueResponse = await axiosInstance
        .post(galxeRequestEndpoints.query, syncCredentialValueBody)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(`Произошла ошибка во время выполнения query syncCredentialValue claimDaily - ${err}`);
            return null;
        });

    if (syncCredentialValueResponse!.data.data.syncCredentialValue.message == errors.goButtonError) {
        const bodyCreateUser = getBasicUserInfoWithAddress(account.address);

        const basicUserInfoResponse = await axiosInstance
            .post(galxeRequestEndpoints.query, bodyCreateUser)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                printError(`Произошла ошибка во время выполнения query basic user info claimDaily- ${err}`);
                return null;
            });

        if (basicUserInfoResponse!.data.data.addressInfo.username == '') {
            printInfo(`Произвожу указание username galxe.`);
            let isUserNameExist = true;
            let userName: string = '';

            while (isUserNameExist == true) {
                userName = generateRandomNickName();
                const isUserNameExistBody = getIsUserNameExist(userName);

                await axiosInstance
                    .post(galxeRequestEndpoints.query, isUserNameExistBody)
                    .then(async (res) => {
                        if (res.data.data.usernameExist == false) {
                            isUserNameExist = false;
                        }

                        return res;
                    })
                    .catch((err) => {
                        printError(`Произошла ошибка во время выполнения is user name exist claimDaily - ${err}`);
                        return null;
                    });
            }

            printInfo(`Произвожу регистрацию на никнейм - ${userName}`);

            const createNewAccountBody = createNewAccount(account.address, userName);

            await axiosInstance.post(galxeRequestEndpoints.query, createNewAccountBody).catch((err) => {
                printError(`Произошла ошибка во время выполнения create new account claimDaily - ${err}`);
                return null;
            });

            await delay(7, 15, false);
        }

        if (basicUserInfoResponse!.data.data.addressInfo.hasEmail == false) {
            const user = await registerMail();

            const sendVerifyCodeBody = await getSendVerifyCode(account.address, user.email);

            await axiosInstance
                .post(galxeRequestEndpoints.query, sendVerifyCodeBody)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    printError(`Произошла ошибка во время выполнения query send verify code claimDaily - ${err}`);
                    return null;
                });

            const updateEmailBody = await getUpdateEmail(account.address, user);

            await axiosInstance.post(galxeRequestEndpoints.query, updateEmailBody).catch((err) => {
                printError(`Произошла ошибка во время выполнения update email claimDaily - ${err}`);
                return null;
            });

            await queryClaimDaily(account, axiosInstance);
        }
    }

    const campaignParticipantsBody = getCampaignParticipants(campaignIDs.daily);

    await axiosInstance
        .post(galxeRequestEndpoints.query, campaignParticipantsBody)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(`Произошла ошибка во время выполнения campaign participants claimDaily - ${err}`);
            return null;
        });

    const campaignDetailAllBody = getCampaignDetailAll(account.address, campaignIDs.daily);

    await axiosInstance
        .post(galxeRequestEndpoints.query, campaignDetailAllBody)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(`Произошла ошибка во время выполнения campaign detail all claimDaily - ${err}`);
            return null;
        });
}

export async function visitProofOfLiquidityPage(account: PrivateKeyAccount, axiosInstance: AxiosInstance) {
    printInfo(`Выполняю модуль Visit Proof Of Liquidity Page galxe.`);

    const addTypedCredentialItems = await getAddTypedCredentialItems(
        account.address,
        credIDs.disposable,
        campaignIDs.disposable,
    );

    await axiosInstance
        .post(galxeRequestEndpoints.query, addTypedCredentialItems)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(
                `Произошла ошибка во время выполнения visit proof of liquidity page add typed credential items disposable - ${err}`,
            );
            return null;
        });

    await delay(5, 10, false);

    const syncCredentialValue = getSyncCredentialValue(account.address, credIDs.disposable);

    await axiosInstance
        .post(galxeRequestEndpoints.query, syncCredentialValue)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(
                `Произошла ошибка во время выполнения visit proof of liquidity page sync typed credential value disposable - ${err}`,
            );
            return null;
        });
}

export async function visitBerachainDocs(account: PrivateKeyAccount, axiosInstance: AxiosInstance) {
    printInfo(`Выполняю модуль Visit Berachain Docs galxe.`);

    const addTypedCredentialItems = await getAddTypedCredentialItems(
        account.address,
        credIDs.berachainDocs,
        campaignIDs.disposable,
    );

    await axiosInstance
        .post(galxeRequestEndpoints.query, addTypedCredentialItems)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(
                `Произошла ошибка во время выполнения visit berachain docs add typed credential items disposable - ${err}`,
            );
            return null;
        });

    await delay(5, 10, false);

    const syncCredentialValue = getSyncCredentialValue(account.address, credIDs.berachainDocs);

    await axiosInstance
        .post(galxeRequestEndpoints.query, syncCredentialValue)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(
                `Произошла ошибка во время выполнения visit berachain docs sync typed credential value disposable - ${err}`,
            );
            return null;
        });
}

export async function answerQuiz(account: PrivateKeyAccount, axiosInstance: AxiosInstance) {
    printInfo(`Выполняю модуль Answer Quiz galxe.`);

    await delay(5, 10, false);

    const syncCredentialValueQuiz = getSyncCredentialValueQuiz(account.address, credIDs.quiz);

    await axiosInstance
        .post(galxeRequestEndpoints.query, syncCredentialValueQuiz)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(
                `Произошла ошибка во время выполнения answer quiz sync typed credential value disposable - ${err}`,
            );
            return null;
        });
}

export async function dripBERA(account: PrivateKeyAccount, axiosInstance: AxiosInstance) {
    printInfo(`Выполняю модуль Drip BERA galxe.`);

    await delay(5, 10, false);

    const syncCredentialValue = getSyncCredentialValue(account.address, credIDs.dripBera);

    await axiosInstance
        .post(galxeRequestEndpoints.query, syncCredentialValue)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(
                `Произошла ошибка во время выполнения drip BERA sync typed credential value disposable - ${err}`,
            );
            return null;
        });
}

export async function swapBERA(account: PrivateKeyAccount, axiosInstance: AxiosInstance) {
    printInfo(`Выполняю модуль Swap BERA galxe.`);

    await delay(5, 10, false);

    const syncCredentialValue = getSyncCredentialValue(account.address, credIDs.swapBera);

    await axiosInstance
        .post(galxeRequestEndpoints.query, syncCredentialValue)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(
                `Произошла ошибка во время выполнения swap BERA sync typed credential value disposable - ${err}`,
            );
            return null;
        });
}

export async function mintHONEY(account: PrivateKeyAccount, axiosInstance: AxiosInstance) {
    printInfo(`Выполняю модуль Mint HONEY galxe.`);

    await delay(5, 10, false);

    const syncCredentialValue = getSyncCredentialValue(account.address, credIDs.mintHoney);

    await axiosInstance
        .post(galxeRequestEndpoints.query, syncCredentialValue)
        .then(async (res) => {
            return res;
        })
        .catch((err) => {
            printError(
                `Произошла ошибка во время выполнения mint HONEY sync typed credential value disposable - ${err}`,
            );
            return null;
        });
}

export async function claimPoints(account: PrivateKeyAccount, axiosInstance: AxiosInstance, isDaily: boolean) {
    printInfo(`Выполняю модуль Claim Points galxe.`);

    const prepareParticipate = await getPrepareParticipate(
        account.address,
        isDaily ? campaignIDs.daily : campaignIDs.disposable,
    );

    await axiosInstance
        .post(galxeRequestEndpoints.query, prepareParticipate)
        .then(async (res) => {
            const points = res.data.data.prepareParticipate.loyaltyPointsTxResp.TotalClaimedPoints;
            printInfo(`Успешно заклеймил ${isDaily ? 'дневные' : ''} - ${points == null ? 0 : points} поинтов`);
            await addTextMessage(`✅Galxe: Claim ${points} ${isDaily ? 'daily' : ''} points`);
            return res;
        })
        .catch((err) => {
            if (err.message.includes(`(reading 'TotalClaimedPoints')`)) {
                printInfo(`Все доступные поинты уже успешно заклеймлены\n`);
                return null;
            }

            printError(`Произошла ошибка во время claim points prepare participate - ${err}`);
            return null;
        });
}

export async function getTotalPoints(account: PrivateKeyAccount, axiosInstance: AxiosInstance) {
    printInfo(`Выполняю модуль Total Points galxe.`);

    const spaceAccessQuery = getSpaceAccessQuery(account.address);

    const response = await axiosInstance.post(galxeRequestEndpoints.query, spaceAccessQuery).catch((err) => {
        printError(`Произошла ошибка во время выполнения get total points space access query - ${err}`);
        return null;
    });

    const totalPoints = response!.data.data.space.addressLoyaltyPoints.points;

    printInfo(`Total points: ${totalPoints}`);
    await addTextMessage(`✅Galxe: Total points ${totalPoints} points`);
}
