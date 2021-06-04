export default [
    {
        constant: true,
        inputs: [],
        name: 'getInfo',
        outputs: [{
            name: '',
            type: 'string'
        }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [{
            name: '_info',
            type: 'string'
        }],
        name: 'ShiftSetInfo',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    }
];