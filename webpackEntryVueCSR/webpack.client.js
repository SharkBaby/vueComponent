const merge = require('webpack-merge')
const path = require('path');
const base = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const config = require('./config')
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const devWebpackConfig = merge(base, {
    entry: {
      smbForgetAndResetPasswordV3: path.join(__dirname, '../pageEntry/smbForgetAndResetPasswordV3.js'),
      smbLoginV3: path.join(__dirname, '../pageEntry/smbLoginV3.js'),
      smbRegistrationV3: path.join(__dirname, '../pageEntry/smbRegistrationV3.js'),
    },
    // plugins: [
    //     new VueSSRClientPlugin()
    // ],
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,
    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
            }, ],
        },
        hot: true,
        inline: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ?
            {
                warnings: false,
                errors: true
            } :
            false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          //打包公共模块
          commons: {
            chunks: 'initial', //initial表示提取入口文件的公共部分
            minChunks: 2, //表示提取公共部分最少的文件数
            minSize: 0, //表示提取公共部分最小的大小
            name: 'commons.vueComponent' //提取出来的文件命名
          }
        }
      }
    },
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port
        // add port to devServer config
        devWebpackConfig.devServer.port = port
  
        // Add FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}/pageHtml/`, 
            `smbLoginV3: http://${devWebpackConfig.devServer.host}:${port}/pageHtml/smbLoginV3.html`,
            `smbRegistrationV3: http://${devWebpackConfig.devServer.host}:${port}/pageHtml/smbRegistrationV3.html`,
            `smbForgetAndResetPasswordV3: http://${devWebpackConfig.devServer.host}:${port}/pageHtml/smbForgetAndResetPasswordV3.html`,
            ],
          },
        //   onErrors: config.dev.notifyOnErrors ?
        //     utils.createNotifierCallback() :
        //     undefined
        onErrors: undefined
        }))
  
        resolve(devWebpackConfig)
      }
    })
  })