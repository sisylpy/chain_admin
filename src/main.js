import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
// import store from '../src/store/index'

import './adminlte/basic.css'
import './adminlte/basic'


Vue.config.productionTip = false


//注册菜单组件
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
