const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                parallel: true
            }),
            // 这个插件使用 cssnano 优化和压缩 CSS
            new CssMinimizerPlugin()
        ]
    }
})