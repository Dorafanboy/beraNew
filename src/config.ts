import { IBridgeRange, IDelayRange, IFixedRange, IPoolObject } from './data/utils/interfaces';
import { defineChain, zeroAddress } from 'viem';
import {
    assetOut,
    stargateUSDContract,
    stgUSDCHONEYPoolContract,
    stgUSDCwBERAPoolContract,
    wBERAHONEYPoolContract,
} from './core/bex/bexData';

export class TelegramData {
    public static readonly TelegramBotId: string = ''; // айди телеграм бота, которому будут отправляться логи
    public static readonly TelegramId: string = ''; // телеграм айди @my_id_bot у него можно получить id
}

export class Config {
    public static readonly isShuffleWallets: boolean = false; // перемешивать ли строки в текстовом файле для приватных ключей
    public static readonly retryCount: number = 8; // сколько попыток будет, чтобы получить новую сеть, значение для бриджа
    public static readonly IsClaimTap: boolean = true;
    public static readonly RuCaptchaApi = ''; //https://rucaptcha.com/enterpage
    public static readonly Score = 0.3; // score <= 0.3 = 99 rub, score > 0.3 160 rub
    public static readonly IsMobileProxy: boolean = true; // если использовать мобильные прокси
    public static readonly IsStaticProxy: boolean = false; // если использовать статичные прокси, если mobile = true, то static = false и наоборот, или оба false, если будет и там и там true, то проритет у мобильных
    public static readonly ChangeMobileProxyUrl: string = ''; // url для смены прокси

    // если стоит IsClaimTap и IsMobileProxy используются прокси, мобильные, если IsStaticProxy то статичные прокси юзаются только в запросах!!!, но в основном можно сотавить чисто на получение в кране
    public static readonly RetryCount: number = 5; // сколько попыток будет сделано чтобы заного попробовать выполнить модуль
    public static readonly DelayBetweenAction: IDelayRange = { min: 1, max: 5 }; // задержка между действиями (в секундах) в случае ошибки
    public static readonly DelayBetweenAccounts: IDelayRange = { min: 7, max: 13 }; // задержка между аккаунтами (в минутах)
    public static readonly DelayBetweenModules: IDelayRange = { min: 0.7, max: 1.7 }; // задержка между модулями (в минутах)
}

export class GalxeConfig {
    public static readonly W: string =
        '41b8410da70c4ce7207df4af8b65db40ee502c1845af106f7398f727271d1912feec0a96632af188b3a5eed9171270a4137279f1452fefa80eca2bcba9d5aeaac5c3e3b49374680ad66c923074ad58b0919dccfc8e6a217467615314dc96aa3c6239eac3952db5c2489511272e97f4cb40919939ed7077eb2a838c73f59ac54a1076ae71d621e37aa96ffb8e864c07ded7b7d7684e634f31ea0f97ba3da14e638179d55b843edbd450a9a6bb1ebeb05a1bc3f051a33699769c89e80e15e948781c319e4c57ce7351995f5c7cfa41805c417f1884e9c8ccee6f170b927f59efa6af0efe849f5010adccabd8e4eefc9b0a138572994c33695306673010c8acd061678168612f2de1752648671b1ed641d4c61e76512792cc225abb8e6fc22b18cccbfaeebc27fd1b1489894e7883d49e7f700ded6c1f1a4169dfc2db4eb7e80ce253be5448361a00beac85b910cac5f9043a64a78fce215ade8bf1aa396729df20af73e2714820c64e79284b307092ad5c52995399ab2f4520ae373824ee356b6089fccdc516666fd7487a44401168d1b3d03af1172ee829ff1cbe2def92b509a56d6ae268890384328c2b2b4e381671316cf9a6216e17481caa052ba467c100de4eb48c4fe0b2356cff6e098292acacbd1feea9e1b8f79594d0cc1509643b5ddfd7bc21125fde8306bc301dd67ca8f2c780dd23c40201e36ad4ce7cb4ffdaffd8'; // w нужно чтобы испольовать galxe
    public static readonly IsOnlyDaily: boolean = true; // если забирать только daily
}

export class BexConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(на число для добавления в пул/бесконечное)
    public static readonly IsBuyBTC: boolean = false; // покупать ли BTC (выбирается одно из двух)
    public static readonly IsBuyETH: boolean = true; // покупать ли ETH (выбирается одно из двух)
    public static readonly SellBeraSTGRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.1, max: 0.5 },
        fixed: { min: 3, max: 5 }, // сколько токенов бера будет потрачено на покупку stgUSDC
    };
    public static readonly SellBeraHoneyRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 1, max: 2 },
        fixed: { min: 2, max: 5 }, // сколько токенов бера будет потрачено на покупку Honey
    };
    public static readonly SellBeraBTCETHRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.3, max: 0.6 },
        fixed: { min: 2, max: 5 }, // сколько токенов бера будет потрачено на покупку BTC/ETH
    };
    public static readonly IsApproveInfinity: boolean = BexConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
    public static readonly AddPools: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 1.5, max: 2 },
        fixed: { min: 2, max: 5 }, // сколько токенов бера добавлять в пул с honey
    };
    public static readonly ClaimBGTRewardPercent: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 1, max: 1 },
        fixed: { min: 3, max: 7 }, // сколько процентов будет забрано из доступных ревардов BGT, если 1 min and max то заберет все
    };
}

export class HoneyConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(на число для свапа/бесконечное)
    public static readonly SellSTGHONEYRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.1, max: 0.4 },
        fixed: { min: 3, max: 5 }, // сколько токенов stgUSDC будет потрачено на покупку HONEY токенов
    };
    public static readonly IsApproveInfinity: boolean = HoneyConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
}

export class BendConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(на число для депа BTC/бесконечное)
    public static readonly honeyDepositRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 2, max: 5 },
        fixed: { min: 2, max: 5 }, // сколько токенов HONEY будет закинуто
    };
    public static readonly ethDepositRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.0005, max: 0.001 },
        fixed: { min: 4, max: 6 }, // сколько токенов ETH будет закинуто
    };
    public static readonly IsApproveInfinity: boolean = BendConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
    public static readonly HoneyBorrowPercentRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 100, max: 100 },
        fixed: { min: 3, max: 7 }, // больше 7 max поставить нельзя, например будет 192524 доступно, а станет если fixed выпадет 5, то будет 100000
    }; // сколько процентов будет занято токена HONEY от имеющегося
}

export class BerpsConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(для добавления в сейф, сколько добавлять/бесконечное)
    public static readonly HoneyDepositRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.1, max: 0.3 },
        fixed: { min: 2, max: 5 }, // сколько токенов stgUSDC будет потрачено на покупку HONEY токенов
    };
    public static readonly IsApproveInfinity: boolean = BerpsConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
}

export class StationConfig {
    private static readonly _isRandomApprove: boolean = true; // производить апрув рандомно(для добавления в сейф, сколько добавлять/бесконечное)
    public static readonly bHoneyDepositRange: { range: IBridgeRange; fixed: IFixedRange } = {
        range: { min: 0.1, max: 0.15 },
        fixed: { min: 2, max: 5 }, // сколько токенов bHoney будет задепозитено в station
    };
    public static readonly IsApproveInfinity: boolean = StationConfig._isRandomApprove ? Math.random() > 0.5 : false; // Использовать случайное значение для IsApproveInfinity
}

export class RewardsConfig {
    public static readonly isClaimRewards: boolean = false; // получать ли награды BGT
}

export class DelegateConfig {
    public static readonly isDelegate: boolean = false; // делегировать ли BGT
    public static readonly isBoostValidator: boolean = false; // бустить ли валидатора(надо ждать)
}

export const berachain = defineChain({
    id: 80084,
    name: 'Berachain Bartio',
    network: 'Berachain bArtio',
    nativeCurrency: {
        decimals: 18,
        name: 'BERA',
        symbol: 'BERA',
    },
    rpcUrls: {
        default: {
            http: ['https://bartio.rpc.berachain.com/'], // поставить сюда https://artio.rpc.berachain.com
        },
        public: {
            http: ['https://bartio.rpc.berachain.com/'], // поставить сюда https://artio.rpc.berachain.com
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://bartio.beratrail.io' },
    },
});
