module.exports = {
    presets: [
        'react-app',
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/proposal-optional-chaining',
        'lodash',
        'react-hot-loader/babel',
        '@babel/plugin-transform-runtime',
        ['transform-imports', {
            reactstrap: {
                transform: 'reactstrap/lib/${member}',
                preventFullImport: true
            },
            lodash: {
                transform: 'lodash/${member}',
                preventFullImport: true
            }
        }]
    ],
    env: {
        production: {
            plugins: [
                [
                    'transform-react-remove-prop-types',
                    {
                        ignoreFilenames: [
                            'node_modules'
                        ]
                    }
                ]
            ]
        },
        test: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react'
            ],
            plugins: [
                'transform-react-remove-prop-types',
                'dynamic-import-node',
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-proposal-class-properties'
            ]
        }
    }
};
