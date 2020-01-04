const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    "mode": "development",
    "entry": {
        "index": path.join(__dirname, '../src', 'index.jsx')
    },
    "output": {
        "path": path.join(__dirname, '../build'),
        "filename": 'bundle.js'
    },
    "plugins": [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public', 'index.html'),
            inject: true
        })
    ],
    "devtool": 'eval-source-map',
    "devServer": {
        "port": 8888,
        "inline": true
    },
    "module": {
        "rules": [
            {
                "test": /\.jsx$/,
                "exclude": /(node_modules)/,
                "loader": "babel-loader",
                "query": {
                    "presets": [
                        "es2015",
                        "react"
                    ],
                    "plugins": [
                        "transform-runtime"
                    ]
                }
            },
            {
                "test": /\.scss$/,
                "loader": ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'assets/[name].[hash:8].[ext]',
                }
            }
        ]
    }
}
