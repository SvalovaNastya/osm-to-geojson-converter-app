const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack")

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
    mode: mode,
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, use: "ts-loader" },
            {
                test: /\.s[ac]ss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    { loader: "sass-loader" },
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {test: /\.(png|svg|ico)$/, use: "file-loader"}
        ]
    },
    plugins: [
        new ESLintWebpackPlugin({
            extensions: [".ts", ".tsx"]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: path.resolve(__dirname, "public", "favicon.ico")
        }),
        new CopyPlugin({patterns: [
            {
                from: path.resolve(__dirname, "public"),
                filter: x => x !== path.resolve(__dirname, "public", "index.html")
            },
            {
                from: path.resolve(__dirname, "node_modules", "leaflet", "dist", "images"),
            }
        ]}),
        new Dotenv()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new HtmlMinimizerPlugin()
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: ["node_modules"],
    },
};