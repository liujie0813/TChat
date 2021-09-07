const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './public/index.html'),//源文件
    filename: 'index.html' //生成内存中首页面的名称
});

module.exports = {
    mode: 'development',// production; development
    plugins: [
        htmlPlugin
    ],
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(sass|less|css)$/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader?limit=100000'
        }, {

        }]
    }
};