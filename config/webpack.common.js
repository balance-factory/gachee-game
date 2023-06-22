const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                    publicPath: "./dist/",
                    name: "fonts/[hash].[ext]",
                },
            },
            {
                test: /\.(jpg|jpeg|png)$/,
                loader: "url-loader",
                options: {
                    name: "images/[hash].[ext]",
                    publicPath: "./dist/",
                    limit: 10000, //10kb
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
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
            "process.env.API_URL": JSON.stringify(process.env.API_URL),
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            React: "react",
        }),
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
        splitChunks: {
            chunks: "all",
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src/"),
            asset: path.resolve(__dirname, "../src/assets/"),
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    },
};
