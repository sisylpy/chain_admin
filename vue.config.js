const webpack = require('webpack');


module.exports = {

    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }]);
    },

    devServer: {
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: {
            '/sys': {
                target: 'http://localhost:8080/chainPro_war_exploded',
                changeOrigin: true
            }
        }
    },

    css: {
        sourceMap: true
    },

    pages: {
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
