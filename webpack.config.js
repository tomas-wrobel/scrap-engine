const path = require("path");

module.exports = {
    entry: "./src/engine.js",
    output: {
        filename: "engine.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            name: "Scrap",
            type: "window",
        },
    },
};
