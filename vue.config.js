// const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "static",
    productionSourceMap: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8066,
        https: false,
        proxy: {
            // '/api': {
            //     target: 'http://', /* 目标代理服务器地址 */
            //     changeOrigin: true,/* 允许跨域 */
            //     secure: false,//不校验https  ssl
            // },
            '/dict': {
                target: 'http://192.168.115.53:8081', /* 目标代理服务器地址http://192.168.115.54:8081  http://jjy.dev:8081/EDUBE*/
                changeOrigin: true,/* 允许跨域 */
                secure: false,//不校验https  ssl
                pathRewrite: {
                    '^/dict': '/dict'
                }
            },

            '/sam': {
                target: 'http://192.168.115.53:8001', /* 目标代理服务器地址http://192.168.115.54:8081 http://192.168.115.53:8081*/
                changeOrigin: true,/* 允许跨域 */
                secure: false,//不校验https  ssl
                pathRewrite: {
                    '^/sam': '/sam'
                }
            },
            '/eam': {
                target: 'http://192.168.115.55:8081', /* 目标代理服务器地址http://192.168.115.54:8081 */
                changeOrigin: true,/* 允许跨域 */
                secure: false,//不校验https  ssl
                pathRewrite: {
                    '^/eam': '/eam'
                }
            },
            '/hsm': {
                target: 'http://192.168.115.131:8081', /* 目标代理服务器地址http://192.168.115.54:8081 */
                changeOrigin: true,/* 允许跨域 */
                secure: false,//不校验https  ssl
                pathRewrite: {
                    '^/hsm': '/hsm'
                }
            },
        },
    },
    //修改插件
    chainWebpack: config => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

        config.plugin('copy').tap(options => {//配置文件
            options[0][0] = {
                from: 'public',
                ignore: ['static/config/index-dev.js']
            }
            return options
        })
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        //拆包
        config
            .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,       //优先级  引入越高越靠上
                        chunks: 'initial' // 基本库 如vue router vuez
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // UI 库
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',  // 项目逻辑
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  超过最小引用次数
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
        config.optimization.runtimeChunk('single')
    },
    //新增加插件
    configureWebpack: config => {
        // config.plugins.push(
        //     //新插件
        // )
        //设置全局变量
        config.externals = {
            SITE: 'SITE',
            tinymce: 'tinymce', //tinymce
        }
    },
}