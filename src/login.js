import Vue from 'vue'
import Login from './Login.vue'
import store from '../src/store/index'

import './adminlte/basic.css'
import './adminlte/basic'
import router from "./routers";



Vue.config.productionTip = false

new Vue({
    router,
    store,

    render: h => h(Login)
}).$mount('#app')
