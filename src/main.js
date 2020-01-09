import Vue from 'vue'
import VueCompositionAPI from './App'

import App from './App.vue'
import router from './routers/index'
import store from '../src/store/index'
import moment from 'moment'


import './adminlte/basic.css'
import './adminlte/basic'


Vue.use(VueCompositionAPI)
Vue.prototype.bus = new Vue;

Vue.config.productionTip = true
Vue.prototype.$moment = moment;//赋值使用

moment.locale('zh-cn');//需要汉化

//注册菜单组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
