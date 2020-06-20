const path = require("path");

module.exports = {
    entry: {
        react_scss_ui: "./src/frontend/react/route/index.js",
        react_material_ui: "./src/frontend/react/route/index_material_ui.js",
    },

    output: {
        path: path.resolve(__dirname, "./build/react/bundle"),
        filename: "bundle_[name].js",
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                fiber: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: "/node_modules/",
            },
        ],
    },
    node: {
        fs: "empty",
    },
};
