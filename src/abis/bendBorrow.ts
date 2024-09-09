export const bendBorrowABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'interestRateMode',
                type: 'uint256',
            },
            {
                internalType: 'uint16',
                name: 'referralCode',
                type: 'uint16',
            },
            {
                internalType: 'address',
                name: 'onBehalfOf',
                type: 'address',
            },
        ],
        name: 'borrow',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
        ],
        name: 'getUserAccountData',
        outputs: [
            {
                internalType: 'uint256',
                name: 'totalCollateralBase',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'totalDebtBase',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'availableBorrowsBase',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'currentLiquidationThreshold',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'ltv',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'healthFactor',
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
                name: 'user',
                type: 'address',
            },
        ],
        name: 'getUserConfiguration',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'data',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct DataTypes.UserConfigurationMap',
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
                name: 'user',
                type: 'address',
            },
        ],
        name: 'getUserEMode',
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
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'aTokenAddress',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'stableDebtAddress',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'variableDebtAddress',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'interestRateStrategyAddress',
                type: 'address',
            },
        ],
        name: 'initReserve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IPoolAddressesProvider',
                name: 'provider',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'collateralAsset',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'debtAsset',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'debtToCover',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'receiveAToken',
                type: 'bool',
            },
        ],
        name: 'liquidationCall',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address[]',
                name: 'assets',
                type: 'address[]',
            },
        ],
        name: 'mintToTreasury',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'onBehalfOf',
                type: 'address',
            },
            {
                internalType: 'uint16',
                name: 'referralCode',
                type: 'uint16',
            },
        ],
        name: 'mintUnbacked',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
        ],
        name: 'rebalanceStableBorrowRate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'interestRateMode',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'onBehalfOf',
                type: 'address',
            },
        ],
        name: 'repay',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'interestRateMode',
                type: 'uint256',
            },
        ],
        name: 'repayWithATokens',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'interestRateMode',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'onBehalfOf',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
            },
            {
                internalType: 'uint8',
                name: 'permitV',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'permitR',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 'permitS',
                type: 'bytes32',
            },
        ],
        name: 'repayWithPermit',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'rescueTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
        ],
        name: 'resetIsolationModeTotalDebt',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'data',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct DataTypes.ReserveConfigurationMap',
                name: 'configuration',
                type: 'tuple',
            },
        ],
        name: 'setConfiguration',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'rateStrategyAddress',
                type: 'address',
            },
        ],
        name: 'setReserveInterestRateStrategyAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'categoryId',
                type: 'uint8',
            },
        ],
        name: 'setUserEMode',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'useAsCollateral',
                type: 'bool',
            },
        ],
        name: 'setUserUseReserveAsCollateral',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'onBehalfOf',
                type: 'address',
            },
            {
                internalType: 'uint16',
                name: 'referralCode',
                type: 'uint16',
            },
        ],
        name: 'supply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'onBehalfOf',
                type: 'address',
            },
            {
                internalType: 'uint16',
                name: 'referralCode',
                type: 'uint16',
            },
            {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
            },
            {
                internalType: 'uint8',
                name: 'permitV',
                type: 'uint8',
            },
            {
                internalType: 'bytes32',
                name: 'permitR',
                type: 'bytes32',
            },
            {
                internalType: 'bytes32',
                name: 'permitS',
                type: 'bytes32',
            },
        ],
        name: 'supplyWithPermit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'interestRateMode',
                type: 'uint256',
            },
        ],
        name: 'swapBorrowRateMode',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'protocolFee',
                type: 'uint256',
            },
        ],
        name: 'updateBridgeProtocolFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint128',
                name: 'flashLoanPremiumTotal',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: 'flashLoanPremiumToProtocol',
                type: 'uint128',
            },
        ],
        name: 'updateFlashloanPremiums',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'asset',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
        ],
        name: 'withdraw',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
