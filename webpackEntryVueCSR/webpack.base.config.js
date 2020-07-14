// webpack.base.config.js
const path = require('path')
const {
    VueLoaderPlugin
} = require('vue-loader')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// A webpack plugin to remove your build folder(s) before building
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const configF = require('./config')
// import webpack configuration for different entry file
// const config = require('../config.json');


module.exports = {
    output: {
        path: path.resolve(process.cwd(), `${process.env.npm_config_environment || 'local'}/fea/`),
        // publicPath: `http://localhost:8181/${config.webpackConfig.entryName}/`,
        // filename: '[name].[chunkhash].js'
        filename: `js/[name].js`,
        // chunkFilename: `common.bundle.js`
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            // '@': resolve('src'),
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // enable CSS extraction
                    extractCSS: true
                }
            },
            // for react.js
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options:{
                  presets: [["@babel/preset-env",{
                      targets:{
                          edge:"17",
                          firefox:"60",
                          chrome:"67",
                          safari:"11.1",
                          ie:"11"
                      },
                      // useBuiltIns:'usage' // this option need tp set corejs version, or there will some warning
                  }]]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'vue-style-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                // test: /\.(png|jpg|gif)$/,
                // use: [
                //   {
                //     // loader: 'file-loader',
                //     options: {
                //       name: '[name].[ext]',
                //       limit: 8192
                //     }
                //   }
                // ]
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                  limit: 1024,
                  esModule: false,
                  name: 'images/[name].[ext]',
                  // outputPath: 'images/',
                  publicPath: configF.generateAssetPath(),
                  // [folder]/ 是为了保留项目组件文件夹内部资源文件夹
                  // 在打包后在img文件夹里面对应生成相同的文件夹,方便维护
                  // 另外取消了图片的hash
                }
              }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextPlugin(`css/[name].css`), // test.[chunkhash].css
        new CleanWebpackPlugin([], {
            "root": path.resolve(__dirname, `../webpackVueCSROutput`),
            "exclude": ['vue-ssr-server-bundle.json', 'vue-ssr-client-manifest.json'],
            "verbose": true,
            "dry": false
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "pageHtml/smbForgetAndResetPasswordV3.html",
            template: path.join(__dirname, '../pageEntry/smbForgetAndResetPasswordV3.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'manual',
            hash:true, //生成链接消除缓存
            chunks:['smbForgetAndResetPasswordV3', 'commons.vueComponent'], //只载入当前页面需要加载的css和js，如果不加这个配置就会将所有页面的css和js加载到同一个页面
        }),
        new HtmlWebpackPlugin({
            filename: "pageHtml/smbLoginV3.html",
            template: path.join(__dirname, '../pageEntry/smbLoginV3.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'manual',
            hash:true, //生成链接消除缓存
            chunks:['smbLoginV3', 'commons.vueComponent'], //只载入当前页面需要加载的css和js，如果不加这个配置就会将所有页面的css和js加载到同一个页面
        }),
        new HtmlWebpackPlugin({
            filename: "pageHtml/smbRegistrationV3.html",
            template: path.join(__dirname, '../pageEntry/smbRegistrationV3.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'manual',
            hash:true, //生成链接消除缓存
            chunks:['smbRegistrationV3', 'commons.vueComponent'], //只载入当前页面需要加载的css和js，如果不加这个配置就会将所有页面的css和js加载到同一个页面
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(), // https://github.com/ampedandwired/html-webpack-plugin
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: configF.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ],
    mode: 'development',
}