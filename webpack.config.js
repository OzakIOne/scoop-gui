const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/frontend/react/route/index.js',
    output: {
        path: path.resolve(__dirname, './build/react/bundle'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    node: {
        fs: 'empty'
    }
}