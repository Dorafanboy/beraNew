export const berpsABI = [
        {
            type: 'function',
            name: 'deposit',
            inputs: [
                {
                    name: 'assets',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'receiver',
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
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'delegate',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'caller',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'depositor',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'assets',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin',
                    name: 'shares',
                    type: 'tuple',
                },
            ],
            name: 'InitializeDeposit',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'depositor',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'withdrawAddress',
                    type: 'address',
                },
            ],
            name: 'SetDepositorWithdrawAddress',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'withdrawer',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'rewardAmount',
                    type: 'tuple[]',
                },
            ],
            name: 'WithdrawDepositRewards',
            type: 'event',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'depositor',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'getCurrentRewards',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'depositor',
                    type: 'address',
                },
            ],
            name: 'getDepositorWithdrawAddress',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'getOutstandingRewards',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'withdrawAddress',
                    type: 'address',
                },
            ],
            name: 'setDepositorWithdrawAddress',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'withdrawAllDepositorRewards',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'withdrawDepositorRewards',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'withdrawDepositorRewardsTo',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
    B = [
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'validator',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'delegator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
                {
                    indexed: !1,
                    internalType: 'int64',
                    name: 'creationHeight',
                    type: 'int64',
                },
            ],
            name: 'CancelUnbondingDelegation',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'validator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'CreateValidator',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'validator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Delegate',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'sourceValidator',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'destinationValidator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Redelegate',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'validator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Unbond',
            type: 'event',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'srcValidator',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'dstValidator',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'beginRedelegate',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'int64',
                    name: 'creationHeight',
                    type: 'int64',
                },
            ],
            name: 'cancelUnbondingDelegation',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getBondedValidators',
            outputs: [
                {
                    internalType: 'address[]',
                    name: '',
                    type: 'address[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getBondedValidatorsByPower',
            outputs: [
                {
                    internalType: 'address[]',
                    name: '',
                    type: 'address[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
            ],
            name: 'getDelegation',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getDelegatorUnbondingDelegations',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'delegatorAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'validatorAddress',
                            type: 'address',
                        },
                        {
                            components: [
                                {
                                    internalType: 'int64',
                                    name: 'creationHeight',
                                    type: 'int64',
                                },
                                {
                                    internalType: 'string',
                                    name: 'completionTime',
                                    type: 'string',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'initialBalance',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'balance',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint64',
                                    name: 'unbondingId',
                                    type: 'uint64',
                                },
                            ],
                            internalType: 'struct IStakingModule.UnbondingDelegationEntry[]',
                            name: 'entries',
                            type: 'tuple[]',
                        },
                    ],
                    internalType: 'struct IStakingModule.UnbondingDelegation[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getDelegatorValidators',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'operatorAddr',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'consAddr',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bool',
                            name: 'jailed',
                            type: 'bool',
                        },
                        {
                            internalType: 'string',
                            name: 'status',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokens',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'delegatorShares',
                            type: 'uint256',
                        },
                        {
                            components: [
                                {
                                    internalType: 'string',
                                    name: 'moniker',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'identity',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'website',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'securityContact',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'details',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Description',
                            name: 'description',
                            type: 'tuple',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'unbondingTime',
                            type: 'string',
                        },
                        {
                            components: [
                                {
                                    components: [
                                        {
                                            internalType: 'uint256',
                                            name: 'rate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxRate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxChangeRate',
                                            type: 'uint256',
                                        },
                                    ],
                                    internalType: 'struct IStakingModule.CommissionRates',
                                    name: 'commissionRates',
                                    type: 'tuple',
                                },
                                {
                                    internalType: 'string',
                                    name: 'updateTime',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Commission',
                            name: 'commission',
                            type: 'tuple',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minSelfDelegation',
                            type: 'uint256',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingOnHoldRefCount',
                            type: 'int64',
                        },
                        {
                            internalType: 'uint64[]',
                            name: 'unbondingIds',
                            type: 'uint64[]',
                        },
                    ],
                    internalType: 'struct IStakingModule.Validator[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'srcValidator',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'dstValidator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getRedelegations',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'int64',
                            name: 'creationHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'completionTime',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'initialBalance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'sharesDst',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint64',
                            name: 'unbondingId',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct IStakingModule.RedelegationEntry[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
            ],
            name: 'getUnbondingDelegation',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'int64',
                            name: 'creationHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'completionTime',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'initialBalance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'balance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint64',
                            name: 'unbondingId',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct IStakingModule.UnbondingDelegationEntry[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
            ],
            name: 'getValidator',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'operatorAddr',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'consAddr',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bool',
                            name: 'jailed',
                            type: 'bool',
                        },
                        {
                            internalType: 'string',
                            name: 'status',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokens',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'delegatorShares',
                            type: 'uint256',
                        },
                        {
                            components: [
                                {
                                    internalType: 'string',
                                    name: 'moniker',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'identity',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'website',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'securityContact',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'details',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Description',
                            name: 'description',
                            type: 'tuple',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'unbondingTime',
                            type: 'string',
                        },
                        {
                            components: [
                                {
                                    components: [
                                        {
                                            internalType: 'uint256',
                                            name: 'rate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxRate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxChangeRate',
                                            type: 'uint256',
                                        },
                                    ],
                                    internalType: 'struct IStakingModule.CommissionRates',
                                    name: 'commissionRates',
                                    type: 'tuple',
                                },
                                {
                                    internalType: 'string',
                                    name: 'updateTime',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Commission',
                            name: 'commission',
                            type: 'tuple',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minSelfDelegation',
                            type: 'uint256',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingOnHoldRefCount',
                            type: 'int64',
                        },
                        {
                            internalType: 'uint64[]',
                            name: 'unbondingIds',
                            type: 'uint64[]',
                        },
                    ],
                    internalType: 'struct IStakingModule.Validator',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getValidatorDelegations',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'delegator',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'balance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'shares',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IStakingModule.Delegation[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getValidators',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'operatorAddr',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'consAddr',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bool',
                            name: 'jailed',
                            type: 'bool',
                        },
                        {
                            internalType: 'string',
                            name: 'status',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokens',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'delegatorShares',
                            type: 'uint256',
                        },
                        {
                            components: [
                                {
                                    internalType: 'string',
                                    name: 'moniker',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'identity',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'website',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'securityContact',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'details',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Description',
                            name: 'description',
                            type: 'tuple',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'unbondingTime',
                            type: 'string',
                        },
                        {
                            components: [
                                {
                                    components: [
                                        {
                                            internalType: 'uint256',
                                            name: 'rate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxRate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxChangeRate',
                                            type: 'uint256',
                                        },
                                    ],
                                    internalType: 'struct IStakingModule.CommissionRates',
                                    name: 'commissionRates',
                                    type: 'tuple',
                                },
                                {
                                    internalType: 'string',
                                    name: 'updateTime',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Commission',
                            name: 'commission',
                            type: 'tuple',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minSelfDelegation',
                            type: 'uint256',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingOnHoldRefCount',
                            type: 'int64',
                        },
                        {
                            internalType: 'uint64[]',
                            name: 'unbondingIds',
                            type: 'uint64[]',
                        },
                    ],
                    internalType: 'struct IStakingModule.Validator[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'undelegate',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes',
                    name: 'consAddr',
                    type: 'bytes',
                },
            ],
            name: 'valAddressFromConsAddress',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
    ],
    V = [
        {
            inputs: [
                {
                    internalType: 'contract StorageInterfaceV5',
                    name: '_storageT',
                    type: 'address',
                },
                {
                    internalType: 'contract GNSPairInfosInterfaceV6',
                    name: '_pairInfos',
                    type: 'address',
                },
                {
                    internalType: 'contract GNSBorrowingFeesInterfaceV6_3_2',
                    name: '_borrowingFees',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '_maxPosDai',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_marketOrdersTimeout',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'CouldNotCloseTrade',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !1,
                    internalType: 'bool',
                    name: 'done',
                    type: 'bool',
                },
            ],
            name: 'Done',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'delegate',
                    type: 'address',
                },
            ],
            name: 'NewDelegation',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !1,
                    internalType: 'string',
                    name: 'name',
                    type: 'string',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'NumberUpdated',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'OpenLimitCanceled',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'trader',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'positionSize',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'spreadReductionP',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'buy',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint256',
                            name: 'leverage',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tp',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'sl',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'block',
                            type: 'uint256',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct StorageInterfaceV5.OpenLimitOrder',
                    name: 'order',
                    type: 'tuple',
                },
            ],
            name: 'OpenLimitPlaced',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newPrice',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newTp',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newSl',
                    type: 'uint256',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'trader',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'positionSize',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'spreadReductionP',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'buy',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint256',
                            name: 'leverage',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tp',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'sl',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'block',
                            type: 'uint256',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct StorageInterfaceV5.OpenLimitOrder',
                    name: 'order',
                    type: 'tuple',
                },
            ],
            name: 'OpenLimitUpdated',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !1,
                    internalType: 'bool',
                    name: 'paused',
                    type: 'bool',
                },
            ],
            name: 'Paused',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newSl',
                    type: 'uint256',
                },
            ],
            name: 'SlUpdated',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newTp',
                    type: 'uint256',
                },
            ],
            name: 'TpUpdated',
            type: 'event',
        },
        {
            inputs: [],
            name: '_msgSender',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'borrowingFees',
            outputs: [
                {
                    internalType: 'contract GNSBorrowingFeesInterfaceV6_3_2',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'cancelOpenLimitOrder',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct GNSTradingV6_3_2.TradeOrOrder[]',
                    name: 'orders',
                    type: 'tuple[]',
                },
            ],
            name: 'cancelOpenLimitOrders',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'closeTradeMarket',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct GNSTradingV6_3_2.TradeOrOrder[]',
                    name: 'trades',
                    type: 'tuple[]',
                },
            ],
            name: 'closeTradesMarket',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    internalType: 'bytes',
                    name: 'call_data',
                    type: 'bytes',
                },
            ],
            name: 'delegatedAction',
            outputs: [
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            name: 'delegations',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'done',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'enum StorageInterfaceV5.LimitOrder',
                    name: 'orderType',
                    type: 'uint8',
                },
                {
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'executeNftOrder',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'isDone',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'isPaused',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'marketOrdersTimeout',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'maxPosDai',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'openLimitOrderTypes',
            outputs: [
                {
                    internalType: 'enum GNSTradingV6_3_2.OpenLimitOrderType',
                    name: '',
                    type: 'uint8',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'trader',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'initialPosToken',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'positionSizeDai',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'openPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'buy',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint256',
                            name: 'leverage',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tp',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'sl',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct StorageInterfaceV5.Trade',
                    name: 't',
                    type: 'tuple',
                },
                {
                    internalType: 'enum GNSTradingV6_3_2.OpenLimitOrderType',
                    name: 'orderType',
                    type: 'uint8',
                },
                {
                    internalType: 'uint256',
                    name: 'slippageP',
                    type: 'uint256',
                },
            ],
            name: 'openTrade',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'pairInfos',
            outputs: [
                {
                    internalType: 'contract GNSPairInfosInterfaceV6',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'pause',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'removeDelegate',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegate',
                    type: 'address',
                },
            ],
            name: 'setDelegate',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'setMarketOrdersTimeout',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'setMaxPosDai',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'storageT',
            outputs: [
                {
                    internalType: 'contract StorageInterfaceV5',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'price',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'tp',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'sl',
                    type: 'uint256',
                },
            ],
            name: 'updateOpenLimitOrder',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'newSl',
                    type: 'uint256',
                },
            ],
            name: 'updateSl',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'newTp',
                    type: 'uint256',
                },
            ],
            name: 'updateTp',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
    F = [
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'aggregate',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes[]',
                    name: 'returnData',
                    type: 'bytes[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'aggregateWrite',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes[]',
                    name: 'returnData',
                    type: 'bytes[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'blockAndAggregate',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes32',
                    name: 'blockHash',
                    type: 'bytes32',
                },
                {
                    components: [
                        {
                            internalType: 'bool',
                            name: 'success',
                            type: 'bool',
                        },
                        {
                            internalType: 'bytes',
                            name: 'returnData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct MyMultiCall.Result[]',
                    name: 'returnData',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
            ],
            name: 'getBlockHash',
            outputs: [
                {
                    internalType: 'bytes32',
                    name: 'blockHash',
                    type: 'bytes32',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getBlockNumber',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCurrentBlockCoinbase',
            outputs: [
                {
                    internalType: 'address',
                    name: 'coinbase',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCurrentBlockDifficulty',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'difficulty',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCurrentBlockGasLimit',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'gaslimit',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCurrentBlockTimestamp',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'timestamp',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'addr',
                    type: 'address',
                },
            ],
            name: 'getEthBalance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'balance',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getLastBlockHash',
            outputs: [
                {
                    internalType: 'bytes32',
                    name: 'blockHash',
                    type: 'bytes32',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'data',
                    type: 'tuple[]',
                },
            ],
            name: 'multiwrite',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bool',
                    name: 'requireSuccess',
                    type: 'bool',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'tryAggregate',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'bool',
                            name: 'success',
                            type: 'bool',
                        },
                        {
                            internalType: 'bytes',
                            name: 'returnData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct MyMultiCall.Result[]',
                    name: 'returnData',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bool',
                    name: 'requireSuccess',
                    type: 'bool',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'tryBlockAndAggregate',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes32',
                    name: 'blockHash',
                    type: 'bytes32',
                },
                {
                    components: [
                        {
                            internalType: 'bool',
                            name: 'success',
                            type: 'bool',
                        },
                        {
                            internalType: 'bytes',
                            name: 'returnData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct MyMultiCall.Result[]',
                    name: 'returnData',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    U = [
        {
            type: 'function',
            name: 'accBlockWeightedMarketCap',
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
            name: 'accBlockWeightedMarketCapLastStored',
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
            name: 'accPnlPerToken',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'int256',
                    internalType: 'int256',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'accPnlPerTokenUsed',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'int256',
                    internalType: 'int256',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'accRewardsPerToken',
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
            name: 'allowance',
            inputs: [
                {
                    name: 'owner',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'spender',
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
            name: 'approve',
            inputs: [
                {
                    name: 'spender',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'amount',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [
                {
                    name: '',
                    type: 'bool',
                    internalType: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'asset',
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
            name: 'availableAssets',
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
            name: 'balanceOfAssets',
            inputs: [
                {
                    name: 'owner',
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
            name: 'cancelWithdrawRequest',
            inputs: [
                {
                    name: 'shares',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'unlockEpoch',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'claimBGT',
            inputs: [
                {
                    name: 'amount',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'recipient',
                    type: 'address',
                    internalType: 'address',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'collateralizationP',
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
            name: 'convertToAssets',
            inputs: [
                {
                    name: 'shares',
                    type: 'uint256',
                    internalType: 'uint256',
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
            name: 'convertToShares',
            inputs: [
                {
                    name: 'assets',
                    type: 'uint256',
                    internalType: 'uint256',
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
            name: 'currentEpoch',
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
            name: 'currentEpochEnd',
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
            name: 'currentEpochPositiveOpenPnl',
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
            name: 'currentEpochStart',
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
            name: 'currentMaxSupply',
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
            name: 'dailyAccPnlDelta',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'int256',
                    internalType: 'int256',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'decimals',
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
            name: 'decreaseAllowance',
            inputs: [
                {
                    name: 'spender',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'subtractedValue',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [
                {
                    name: '',
                    type: 'bool',
                    internalType: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'distributeReward',
            inputs: [
                {
                    name: 'assets',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'epochLength',
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
            name: 'feesToPolP',
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
            name: 'forceNewEpoch',
            inputs: [],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'getPendingAccBlockWeightedMarketCap',
            inputs: [
                {
                    name: 'currentBlock',
                    type: 'uint256',
                    internalType: 'uint256',
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
            name: 'increaseAllowance',
            inputs: [
                {
                    name: 'spender',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'addedValue',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [
                {
                    name: '',
                    type: 'bool',
                    internalType: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'initialize',
            inputs: [
                {
                    name: '_name',
                    type: 'string',
                    internalType: 'string',
                },
                {
                    name: '_symbol',
                    type: 'string',
                    internalType: 'string',
                },
                {
                    name: '_contractAddresses',
                    type: 'tuple',
                    internalType: 'struct IBToken.ContractAddresses',
                    components: [
                        {
                            name: 'asset',
                            type: 'address',
                            internalType: 'address',
                        },
                        {
                            name: 'owner',
                            type: 'address',
                            internalType: 'address',
                        },
                        {
                            name: 'manager',
                            type: 'address',
                            internalType: 'address',
                        },
                        {
                            name: 'pnlHandler',
                            type: 'address',
                            internalType: 'address',
                        },
                    ],
                },
                {
                    name: '_maxDailyAccPnlDelta',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: '_withdrawLockThresholdsPLow',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: '_withdrawLockThresholdsPHigh',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: '_maxSupplyIncreaseDailyP',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: '_lossesBurnP',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: '_epochLength',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: '_feesToPolP',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'initializeV2',
            inputs: [],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'lastDailyAccPnlDeltaReset',
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
            name: 'lastMaxSupplyUpdate',
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
            name: 'lossesBurnP',
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
            name: 'makeWithdrawRequest',
            inputs: [
                {
                    name: 'shares',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'manager',
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
            name: 'marketCap',
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
            name: 'maxAccPnlPerToken',
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
            name: 'maxDailyAccPnlDelta',
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
            name: 'maxDeposit',
            inputs: [
                {
                    name: 'owner',
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
            name: 'maxMint',
            inputs: [
                {
                    name: '',
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
            name: 'maxRedeem',
            inputs: [
                {
                    name: 'owner',
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
            name: 'maxSupplyIncreaseDailyP',
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
            name: 'maxWithdraw',
            inputs: [
                {
                    name: 'owner',
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
            name: 'mint',
            inputs: [
                {
                    name: 'shares',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'receiver',
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
            name: 'name',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'string',
                    internalType: 'string',
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
            name: 'pendingBGT',
            inputs: [
                {
                    name: 'owner',
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
            name: 'pnlHandler',
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
            name: 'previewDeposit',
            inputs: [
                {
                    name: 'assets',
                    type: 'uint256',
                    internalType: 'uint256',
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
            name: 'previewMint',
            inputs: [
                {
                    name: 'shares',
                    type: 'uint256',
                    internalType: 'uint256',
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
            name: 'previewRedeem',
            inputs: [
                {
                    name: 'shares',
                    type: 'uint256',
                    internalType: 'uint256',
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
            name: 'previewWithdraw',
            inputs: [
                {
                    name: 'assets',
                    type: 'uint256',
                    internalType: 'uint256',
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
            name: 'receiveAssets',
            inputs: [
                {
                    name: 'assets',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'user',
                    type: 'address',
                    internalType: 'address',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'redeem',
            inputs: [
                {
                    name: 'shares',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'receiver',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'owner',
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
            name: 'renounceOwnership',
            inputs: [],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'rewarder',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'address',
                    internalType: 'contract IPoLRewarder',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'sendAssets',
            inputs: [
                {
                    name: 'assets',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'receiver',
                    type: 'address',
                    internalType: 'address',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'shareToAssetsPrice',
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
            name: 'storeAccBlockWeightedMarketCap',
            inputs: [],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'symbol',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'string',
                    internalType: 'string',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'totalAssets',
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
            name: 'totalClosedPnl',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'int256',
                    internalType: 'int256',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'totalDeposited',
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
            name: 'totalLiability',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'int256',
                    internalType: 'int256',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'totalRewards',
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
            name: 'totalSharesBeingWithdrawn',
            inputs: [
                {
                    name: 'owner',
                    type: 'address',
                    internalType: 'address',
                },
            ],
            outputs: [
                {
                    name: 'shares',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            stateMutability: 'view',
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
            name: 'transfer',
            inputs: [
                {
                    name: 'to',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'amount',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [
                {
                    name: '',
                    type: 'bool',
                    internalType: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'transferFrom',
            inputs: [
                {
                    name: 'from',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'to',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'amount',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [
                {
                    name: '',
                    type: 'bool',
                    internalType: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
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
            name: 'tryResetDailyAccPnlDelta',
            inputs: [],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'tryUpdateCurrentMaxSupply',
            inputs: [],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'tvl',
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
            name: 'updateLossesBurnP',
            inputs: [
                {
                    name: 'newValue',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'updateManager',
            inputs: [
                {
                    name: 'newValue',
                    type: 'address',
                    internalType: 'address',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'updateMaxDailyAccPnlDelta',
            inputs: [
                {
                    name: 'newValue',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'updateMaxSupplyIncreaseDailyP',
            inputs: [
                {
                    name: 'newValue',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'updatePnlHandler',
            inputs: [
                {
                    name: 'newValue',
                    type: 'address',
                    internalType: 'address',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'updateWithdrawLockThresholdsP',
            inputs: [
                {
                    name: 'newValue',
                    type: 'uint256[2]',
                    internalType: 'uint256[2]',
                },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'withdraw',
            inputs: [
                {
                    name: 'assets',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'receiver',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'owner',
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
            name: 'withdrawEpochsTimelock',
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
            name: 'withdrawLockThresholdsP',
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
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'withdrawRequests',
            inputs: [
                {
                    name: '',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: '',
                    type: 'uint256',
                    internalType: 'uint256',
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
            type: 'event',
            name: 'AccBlockWeightedMarketCapStored',
            inputs: [
                {
                    name: 'newAccValue',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'AccPnlPerTokenUsedUpdated',
            inputs: [
                {
                    name: 'newEpoch',
                    type: 'uint256',
                    indexed: !0,
                    internalType: 'uint256',
                },
                {
                    name: 'newEpochPositiveOpenPnl',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'newAccPnlPerTokenUsed',
                    type: 'int256',
                    indexed: !1,
                    internalType: 'int256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'AddressParamUpdated',
            inputs: [
                {
                    name: 'name',
                    type: 'string',
                    indexed: !1,
                    internalType: 'string',
                },
                {
                    name: 'newValue',
                    type: 'address',
                    indexed: !1,
                    internalType: 'address',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'Approval',
            inputs: [
                {
                    name: 'owner',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'spender',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'value',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'AssetsReceived',
            inputs: [
                {
                    name: 'sender',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'user',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'assets',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'assetsLessDeplete',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'AssetsSent',
            inputs: [
                {
                    name: 'sender',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'receiver',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'assets',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'CurrentMaxSupplyUpdated',
            inputs: [
                {
                    name: 'newValue',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'DailyAccPnlDeltaReset',
            inputs: [],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'Deposit',
            inputs: [
                {
                    name: 'sender',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'owner',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'assets',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'shares',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'FeesDistributed',
            inputs: [
                {
                    name: 'assetsToHoney',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'assetsToBGT',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'assetsTotal',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'vaultTVL',
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
                    type: 'uint8',
                    indexed: !1,
                    internalType: 'uint8',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'NewEpoch',
            inputs: [
                {
                    name: 'newEpoch',
                    type: 'uint256',
                    indexed: !0,
                    internalType: 'uint256',
                },
                {
                    name: 'newEpochPositiveOpenPnl',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'NewEpochForced',
            inputs: [
                {
                    name: 'newEpoch',
                    type: 'uint256',
                    indexed: !0,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'NumberParamUpdated',
            inputs: [
                {
                    name: 'name',
                    type: 'string',
                    indexed: !1,
                    internalType: 'string',
                },
                {
                    name: 'newValue',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'OpenTradesPnlFeedCallFailed',
            inputs: [],
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
            name: 'ShareToAssetsPriceUpdated',
            inputs: [
                {
                    name: 'newValue',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'Transfer',
            inputs: [
                {
                    name: 'from',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'to',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'value',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'Withdraw',
            inputs: [
                {
                    name: 'sender',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'receiver',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'owner',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'assets',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'shares',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'WithdrawCanceled',
            inputs: [
                {
                    name: 'sender',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'owner',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'shares',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'currEpoch',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'unlockEpoch',
                    type: 'uint256',
                    indexed: !0,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'WithdrawLockThresholdsPUpdated',
            inputs: [
                {
                    name: 'newValue',
                    type: 'uint256[2]',
                    indexed: !1,
                    internalType: 'uint256[2]',
                },
            ],
            anonymous: !1,
        },
        {
            type: 'event',
            name: 'WithdrawRequested',
            inputs: [
                {
                    name: 'sender',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'owner',
                    type: 'address',
                    indexed: !0,
                    internalType: 'address',
                },
                {
                    name: 'shares',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'currEpoch',
                    type: 'uint256',
                    indexed: !1,
                    internalType: 'uint256',
                },
                {
                    name: 'unlockEpoch',
                    type: 'uint256',
                    indexed: !0,
                    internalType: 'uint256',
                },
            ],
            anonymous: !1,
        },
    ],
    W = [
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'burner',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Burn',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'CoinReceived',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'spender',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'CoinSpent',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'minter',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Coinbase',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
            ],
            name: 'Message',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Transfer',
            type: 'event',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'accountAddress',
                    type: 'address',
                },
            ],
            name: 'getAllBalances',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'accountAddress',
                    type: 'address',
                },
            ],
            name: 'getAllSpendableBalances',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getAllSupply',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'accountAddress',
                    type: 'address',
                },
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getBalance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getDenomMetadata',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'description',
                            type: 'string',
                        },
                        {
                            components: [
                                {
                                    internalType: 'string',
                                    name: 'denom',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string[]',
                                    name: 'aliases',
                                    type: 'string[]',
                                },
                                {
                                    internalType: 'uint32',
                                    name: 'exponent',
                                    type: 'uint32',
                                },
                            ],
                            internalType: 'struct IBankModule.DenomUnit[]',
                            name: 'denomUnits',
                            type: 'tuple[]',
                        },
                        {
                            internalType: 'string',
                            name: 'base',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: 'display',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: 'name',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: 'symbol',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct IBankModule.DenomMetadata',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getSendEnabled',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'accountAddress',
                    type: 'address',
                },
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getSpendableBalance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getSupply',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'fromAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'toAddress',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'send',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
    ],
    Y = [
        {
            type: 'constructor',
            inputs: [
                {
                    name: '_bgtRewarder',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: '_lendRewardsAggregator',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: '_perpsRewarder',
                    type: 'address',
                    internalType: 'address',
                },
            ],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'IS_SCRIPT',
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
            name: 'claimAllRewards',
            inputs: [
                {
                    name: '_receiver',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'dexPoolAddresses',
                    type: 'address[]',
                    internalType: 'address[]',
                },
            ],
            outputs: [],
            stateMutability: 'payable',
        },
        {
            type: 'function',
            name: 'getAllRewards',
            inputs: [
                {
                    name: '_owner',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'dexPoolAddresses',
                    type: 'address[]',
                    internalType: 'address[]',
                },
            ],
            outputs: [
                {
                    name: 'dexPendingRewards',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'lendPendingRewards',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'perpsPendingRewards',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
        },
    ];
