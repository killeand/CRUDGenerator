const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/scripts/app.js",
    output: {
        path: path.resolve(__dirname, "dev"),
        filename: "main.js"
    },
    resolve: {
        extensions: [".js",".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(dev|node_modules|prod)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", {"legacy": true}],
                            ["@babel/plugin-proposal-class-properties", {"loose": true}],
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-transform-react-jsx"
                        ]
                    }
                }
            }
        ]
    }
};