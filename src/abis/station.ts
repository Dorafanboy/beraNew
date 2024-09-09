﻿export const stationABI = [
    {
        type: 'constructor',
        inputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'REWARD_TOKEN',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract IERC20',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'STAKE_TOKEN',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract IERC20',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'addIncentive',
        inputs: [
            {
                name: 'token',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'incentiveRate',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'balanceOf',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'beraChef',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract IBeraChef',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'delegateStake',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'delegateWithdraw',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'distributor',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'earned',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'exit',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'getReward',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'getRewardForDuration',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getWhitelistedTokens',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address[]',
                internalType: 'address[]',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getWhitelistedTokensCount',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'incentives',
        inputs: [
            {
                name: 'token',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: 'minIncentiveRate',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'incentiveRate',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'amountRemaining',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'initialize',
        inputs: [
            {
                name: '_bgt',
                type: 'address',
                internalType: 'address',
            },
            {
                name: '_distributor',
                type: 'address',
                internalType: 'address',
            },
            {
                name: '_berachef',
                type: 'address',
                internalType: 'address',
            },
            {
                name: '_governance',
                type: 'address',
                internalType: 'address',
            },
            {
                name: '_stakingToken',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'lastTimeRewardApplicable',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'lastUpdateTime',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'maxIncentiveTokensCount',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint8',
                internalType: 'uint8',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'notifyRewardAmount',
        inputs: [
            {
                name: 'coinbase',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'reward',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'operator',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'owner',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'pause',
        inputs: [
            {
                name: '_paused',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'paused',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'periodFinish',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'recoverERC20',
        inputs: [
            {
                name: 'tokenAddress',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'tokenAmount',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'removeIncentiveToken',
        inputs: [
            {
                name: 'token',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'renounceOwnership',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'rewardPerToken',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'rewardPerTokenStored',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'rewardRate',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'rewards',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'rewardsDuration',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'setDistributor',
        inputs: [
            {
                name: '_rewardDistribution',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setMaxIncentiveTokensCount',
        inputs: [
            {
                name: '_maxIncentiveTokensCount',
                type: 'uint8',
                internalType: 'uint8',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setOperator',
        inputs: [
            {
                name: '_operator',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'setRewardsDuration',
        inputs: [
            {
                name: '_rewardsDuration',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'stake',
        inputs: [
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'totalSupply',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'transferOwnership',
        inputs: [
            {
                name: 'newOwner',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'undistributedRewards',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'userRewardPerTokenPaid',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'whitelistIncentiveToken',
        inputs: [
            {
                name: 'token',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'minIncentiveRate',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'whitelistedTokens',
        inputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'withdraw',
        inputs: [
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'event',
        name: 'DelegateStaked',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'delegate',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'DelegateWithdrawn',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'delegate',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'DistributorSet',
        inputs: [
            {
                name: 'distributor',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'IncentiveAdded',
        inputs: [
            {
                name: 'token',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'sender',
                type: 'address',
                indexed: !1,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
            {
                name: 'incentiveRate',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'IncentiveTokenRemoved',
        inputs: [
            {
                name: 'token',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'IncentiveTokenWhitelisted',
        inputs: [
            {
                name: 'token',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'minIncentiveRate',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'IncentivesProcessed',
        inputs: [
            {
                name: 'coinbase',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'token',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'bgtEmitted',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'Initialized',
        inputs: [
            {
                name: 'version',
                type: 'uint64',
                indexed: !1,
                internalType: 'uint64',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'MaxIncentiveTokensCountUpdated',
        inputs: [
            {
                name: 'maxIncentiveTokensCount',
                type: 'uint8',
                indexed: !1,
                internalType: 'uint8',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'OperatorSet',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: !1,
                internalType: 'address',
            },
            {
                name: 'operator',
                type: 'address',
                indexed: !1,
                internalType: 'address',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'OwnershipTransferred',
        inputs: [
            {
                name: 'previousOwner',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'newOwner',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'Paused',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: !1,
                internalType: 'address',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'Recovered',
        inputs: [
            {
                name: 'token',
                type: 'address',
                indexed: !1,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'RewardAdded',
        inputs: [
            {
                name: 'reward',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'RewardPaid',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'to',
                type: 'address',
                indexed: !1,
                internalType: 'address',
            },
            {
                name: 'reward',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'RewardsDurationUpdated',
        inputs: [
            {
                name: 'newDuration',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'Staked',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'Unpaused',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: !1,
                internalType: 'address',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'event',
        name: 'Withdrawn',
        inputs: [
            {
                name: 'account',
                type: 'address',
                indexed: !0,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: !1,
                internalType: 'uint256',
            },
        ],
        anonymous: !1,
    },
    {
        type: 'error',
        name: 'AlreadyInitialized',
        inputs: [],
    },
    {
        type: 'error',
        name: 'AmountLessThanMinIncentiveRate',
        inputs: [],
    },
    {
        type: 'error',
        name: 'BlockDoesNotExist',
        inputs: [],
    },
    {
        type: 'error',
        name: 'BlockNotInBuffer',
        inputs: [],
    },
    {
        type: 'error',
        name: 'CannotRecoverRewardToken',
        inputs: [],
    },
    {
        type: 'error',
        name: 'CannotRecoverStakingToken',
        inputs: [],
    },
    {
        type: 'error',
        name: 'EnforcedPause',
        inputs: [],
    },
    {
        type: 'error',
        name: 'ExpectedPause',
        inputs: [],
    },
    {
        type: 'error',
        name: 'InsufficientSelfStake',
        inputs: [],
    },
    {
        type: 'error',
        name: 'InvalidCommission',
        inputs: [],
    },
    {
        type: 'error',
        name: 'InvalidCuttingBoardWeights',
        inputs: [],
    },
    {
        type: 'error',
        name: 'InvalidInitialization',
        inputs: [],
    },
    {
        type: 'error',
        name: 'InvalidMaxIncentiveTokensCount',
        inputs: [],
    },
    {
        type: 'error',
        name: 'InvalidMinter',
        inputs: [],
    },
    {
        type: 'error',
        name: 'InvalidStartBlock',
        inputs: [],
    },
    {
        type: 'error',
        name: 'InvariantCheckFailed',
        inputs: [],
    },
    {
        type: 'error',
        name: 'MaxNumWeightsPerCuttingBoardIsZero',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NoWhitelistedTokens',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotActionableBlock',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotApprovedSender',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotBGT',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotBlockRewardController',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotDistributor',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotEnoughBalance',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotEnoughTime',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotFeeCollector',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotFriendOfTheChef',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotGovernance',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotInitializing',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotOperator',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotProver',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotRootFollower',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotStaker',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotValidatorOrOperator',
        inputs: [],
    },
    {
        type: 'error',
        name: 'OwnableInvalidOwner',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'OwnableUnauthorizedAccount',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'PayoutAmountIsZero',
        inputs: [],
    },
    {
        type: 'error',
        name: 'ProvidedRewardTooHigh',
        inputs: [],
    },
    {
        type: 'error',
        name: 'QueuedCuttingBoardNotFound',
        inputs: [],
    },
    {
        type: 'error',
        name: 'QueuedCuttingBoardNotReady',
        inputs: [],
    },
    {
        type: 'error',
        name: 'ReentrancyGuardReentrantCall',
        inputs: [],
    },
    {
        type: 'error',
        name: 'RewardCycleNotEnded',
        inputs: [],
    },
    {
        type: 'error',
        name: 'StakeAmountIsZero',
        inputs: [],
    },
    {
        type: 'error',
        name: 'TokenAlreadyWhitelistedOrLimitReached',
        inputs: [],
    },
    {
        type: 'error',
        name: 'TokenNotWhitelisted',
        inputs: [],
    },
    {
        type: 'error',
        name: 'TooManyWeights',
        inputs: [],
    },
    {
        type: 'error',
        name: 'Unauthorized',
        inputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'VaultAlreadyExists',
        inputs: [],
    },
    {
        type: 'error',
        name: 'WithdrawAmountIsZero',
        inputs: [],
    },
    {
        type: 'error',
        name: 'ZeroAddress',
        inputs: [],
    },
];
