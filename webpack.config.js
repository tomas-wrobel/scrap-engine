const path = require("path");

module.exports = {
    entry: {
        Scrap: "./src/engine.ts",
        Color: "./src/color.ts",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        library: {
            name: "[name]",
            type: "window",
        },
    },
};
