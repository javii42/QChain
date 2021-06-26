export default [
    {
        type: 'constructor',
        stateMutability: 'nonpayable',
        inputs: []
    }, {
        type: 'function',
        stateMutability: 'view',
        outputs: [{
            type: 'tuple[]',
            name: '_currentShifts',
            internalType: 'struct QChain.Shift[]',
            components: [{
                type: 'uint256',
                name: 'index',
                internalType: 'uint256'
            }, {
                type: 'string',
                name: 'date',
                internalType: 'string'
            }, {
                type: 'string',
                name: 'jsonData',
                internalType: 'string'
            }, {
                type: 'string',
                name: 'user',
                internalType: 'string'
            }, {
                type: 'bool',
                name: 'status',
                internalType: 'bool'
            }]
        }],
        name: 'getShift',
        inputs: [{
            type: 'address',
            name: 'userAddress',
            internalType: 'address'
        }]
    }, {
        type: 'function',
        stateMutability: 'nonpayable',
        outputs: [],
        name: 'insertShift',
        inputs: [{
            type: 'address',
            name: 'userAddress',
            internalType: 'address'
        }, {
            type: 'uint256',
            name: '_index',
            internalType: 'uint256'
        }, {
            type: 'string',
            name: '_date',
            internalType: 'string'
        }, {
            type: 'string',
            name: '_jsonData',
            internalType: 'string'
        }, {
            type: 'string',
            name: '_user',
            internalType: 'string'
        }, {
            type: 'bool',
            name: '_status',
            internalType: 'bool'
        }]
    }, {
        type: 'function',
        stateMutability: 'view',
        outputs: [{
            type: 'address',
            name: '',
            internalType: 'address'
        }],
        name: 'shiftAddress',
        inputs: []
    }, {
        type: 'function',
        stateMutability: 'view',
        outputs: [{
            type: 'uint256',
            name: 'index',
            internalType: 'uint256'
        }, {
            type: 'string',
            name: 'date',
            internalType: 'string'
        }, {
            type: 'string',
            name: 'jsonData',
            internalType: 'string'
        }, {
            type: 'string',
            name: 'user',
            internalType: 'string'
        }, {
            type: 'bool',
            name: 'status',
            internalType: 'bool'
        }],
        name: 'shifts',
        inputs: [{
            type: 'uint256',
            name: '',
            internalType: 'uint256'
        }]
    }, {
        type: 'function',
        stateMutability: 'view',
        outputs: [{
            type: 'uint256',
            name: 'index',
            internalType: 'uint256'
        }, {
            type: 'string',
            name: 'date',
            internalType: 'string'
        }, {
            type: 'string',
            name: 'jsonData',
            internalType: 'string'
        }, {
            type: 'string',
            name: 'user',
            internalType: 'string'
        }, {
            type: 'bool',
            name: 'status',
            internalType: 'bool'
        }],
        name: 'shiftsAddresses',
        inputs: [{
            type: 'address',
            name: '',
            internalType: 'address'
        }, {
            type: 'uint256',
            name: '',
            internalType: 'uint256'
        }]
    }];
