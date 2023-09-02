const path = require("path");

module.exports = {
    entry: {
        Scrap: "./src/engine.js",
        Color: "./src/color.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        library: {
            name: "[name]",
            type: "window",
        },
    },
};
