import { Hex } from 'viem';

export interface IBridgeRange {
    readonly min: number;
    readonly max: number;
}

export interface IFixedRange extends IBridgeRange {}

export interface IDelayRange extends IBridgeRange {}

export interface IRouteStep {
    readonly amountIn: bigint;
    readonly amountOut: bigint;
    readonly assetIn: Hex;
    readonly assetOut: Hex;
    readonly pool: Hex;
}

export interface IPoolObject {
    readonly poolAddress: Hex;
    readonly toApprove: Hex;
    readonly firstTokenAmount: { range: IBridgeRange; fixed: IFixedRange };
    readonly secondTokenAmount: { range: IBridgeRange; fixed: IFixedRange };
    readonly firstTokenName: string;
    readonly secondTokenName: string;
    readonly firstTokenAddress: Hex;
    readonly secondTokenAddress: Hex;
}

export interface IRewards {
    readonly amount: bigint;
    readonly denom: string;
}

export interface IUser {
    readonly email: string;
    readonly password: string;
}

export interface ICaptcha {
    readonly lotNumber: string;
    readonly captchaOutput: string;
    readonly passToken: string;
    readonly genTime: string;
}

export interface ITokenInformation {
    readonly usdValue: string;
    readonly beraValue: string;
}

export interface IBexSteps {
    readonly poolIdx: string;
    readonly isBuy: boolean;
}

export interface IBexTokenData {
    readonly tokenName: string;
    readonly tokenAddress: Hex;
    readonly decimals: number;
}

export interface IBoostData {
    readonly accountAddress: string;
    readonly delegateAddress: string;
}
