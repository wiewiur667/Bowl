var webpack = require("webpack");


module.exports = {
    watch:true,
    devtool: 'source-map',
    output: {
        filename: './bundle.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.ts?$/,
                loaders: ["awesome-typescript-loader", "angular2-template-loader"],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader'
            }
        ]
    }
};