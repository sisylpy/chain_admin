import Vue from 'vue'
import Vuex from 'vuex'
import sysUser from './modules/sysUser'
import pageHeader from './modules/pageHeader'
Vue.use(Vuex)



export default new Vuex.Store({

    modules: {
        sysUser,
        pageHeader,

    },
    state: {

    }


})
