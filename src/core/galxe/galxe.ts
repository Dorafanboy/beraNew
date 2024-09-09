import { PrivateKeyAccount } from 'viem';
import {
    answerQuiz,
    dripBERA,
    getTotalPoints,
    mintHONEY,
    getAuthToken,
    queryClaimDaily,
    swapBERA,
    visitBerachainDocs,
    visitProofOfLiquidityPage,
    claimPoints,
} from '../../data/helpers/galxeRequester';
import { delay } from '../../data/helpers/delayer';
import { GalxeConfig } from '../../config';
import { generateAxiosInstance } from '../../data/axiosInstance/axiosInstance';
import { HttpAgentObject, SocksAgentObject } from '../../data/utils/utilsData';

export async function queryGalxe(account: PrivateKeyAccount, agent: HttpAgentObject | SocksAgentObject | null) {
    const token = await getAuthToken(account);
    const axiosInstance = generateAxiosInstance(token, agent);

    if (GalxeConfig.IsOnlyDaily) {
        await queryClaimDaily(account, axiosInstance);
        await claimPoints(account, axiosInstance, true);
        await delay(5, 10, false);
        await getTotalPoints(account, axiosInstance);
        return true;
    }

    await queryClaimDaily(account, axiosInstance);
    await visitProofOfLiquidityPage(account, axiosInstance);
    await visitBerachainDocs(account, axiosInstance);
    await answerQuiz(account, axiosInstance);
    await dripBERA(account, axiosInstance);
    await swapBERA(account, axiosInstance);
    await mintHONEY(account, axiosInstance);

    await claimPoints(account, axiosInstance, true);
    await claimPoints(account, axiosInstance, false);
    await getTotalPoints(account, axiosInstance);

    return true;
}
