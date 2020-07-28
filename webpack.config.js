var path = require("path");

module.exports = {
    entry: "./src/server.ts",
    target: "node",
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "evotiming.broker.js"
    },
    resolve: {
        extensions: [".ts", ".js"] //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.ts?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    }
};
