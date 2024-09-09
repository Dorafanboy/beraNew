import { Config } from '../../config';
import { parseUnits } from 'viem';

export const sitekey = '0x4AAAAAAARdAuciFArKhVwt';
export const action = 'submit';
export const pageurl = 'https://bartio.faucet.berachain.com/#dapps';

export const captchaEndpoints = {
    getBalance: 'https://api.2captcha.com/getBalance',
    createTask: `https://api.2captcha.com/createTask`,
    getTaskResult: `https://api.2captcha.com/getTaskResult`,
    getCaptchaStatus: `https://rucaptcha.com/in.php`,
    getCaptchaResolve: `https://rucaptcha.com/res.php`,
};

export const balanceJsonData = {
    clientKey: Config.RuCaptchaApi,
};

export const requestEndpoints = {
    getToken: `https://bartio-faucet.berachain-devnet.com/api/claim`,
    getRoute: `https://bartio-bex-router.berachain-devnet.com/dex/route`,
};

export const taskJsonData = {
    clientKey: Config.RuCaptchaApi,
    task: {
        type: 'RecaptchaV3TaskProxyless',
        websiteURL: pageurl,
        websiteKey: sitekey,
        minScore: Config.Score,
        pageAction: action,
    },
};

export const responseJsonData = {
    clientKey: Config.RuCaptchaApi,
    task: {
        type: 'TurnstileTaskProxyless',
        websiteURL: pageurl,
        websiteKey: sitekey,
    },
};

export const balanceEthLimit = parseUnits('1', 15);
