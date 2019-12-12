const webpack = require('webpack');


module.exports = {


    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }]);
        config.plugin('ignore')
            .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));//忽略/moment/locale下的所有文件
    },

    devServer: {
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: {
            '/sys': {
                // target: 'http://localhost:8080/chainPro_war_exploded',
                target: 'https://grainservice.club:8080/chainOrder',

                //https://grainservice.club:8080/chainOrder
                changeOrigin: true
            }
        }
    },

    css: {
        sourceMap: true
    },

    pages: {
        apply: {
            entry: 'src/apply.js',
            template: 'public/apply.html'
        },
        login: {
            entry: 'src/login.js',
            template: 'public/login.html'
        },
        index: {
            entry: 'src/main.js',
            template: 'public/index.html'
        }
    },


}
