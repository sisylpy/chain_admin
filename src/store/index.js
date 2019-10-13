import Vue from 'vue'
import Vuex from 'vuex'
import sysUser from './modules/sysUser'

Vue.use(Vuex)



export default new Vuex.Store({

    modules: {
        sysUser,

    },
    state: {
        count: 10
    }


})
