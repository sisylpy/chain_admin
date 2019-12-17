import Vue from 'vue'
import Vuex from 'vuex'
import sysUser from './modules/sysUser'
import pageHeader from './modules/pageHeader'
import orders from './modules/orders'
import stock from './modules/stock'
import store from './modules/store'




Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        sysUser,
        pageHeader,
        orders,
        stock,
        store

    },
    state: {

    }


})
