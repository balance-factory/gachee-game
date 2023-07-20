const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// BundleAnalyzer는 Bundle 최적화 용도로 보통 저는 사용합니다.

module.exports = {
    entry: `${path.resolve(__dirname, "../src")}/index.tsx`,
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },

            {
                test: /\.(ico|png|jpg|jpeg|gif|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                    name: "[hash].[ext]",
                    limit: 50000,
                },
            },

            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            titleProp: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        new webpack.ProvidePlugin({
            React: "react",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src/"),
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    },
};
