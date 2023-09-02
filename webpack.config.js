const path = require("path");

module.exports = {
    entry: {
        Scrap: "./src/engine.js",
        Color: "./src/color.js",
    },
    output: {
        filename: "engine.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            name: "[name]",
            type: "window",
        },
    },
};
