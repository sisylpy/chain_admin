import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import store from '../src/store/index'
import moment from 'moment'

import './adminlte/basic.css'
import './adminlte/basic'
import Print from '@/utils/print'



Vue.use(Print);
Vue.prototype.bus = new Vue;


Vue.config.productionTip = false
Vue.prototype.$moment = moment;//赋值使用

moment.locale('zh-cn');//需要汉化

//注册菜单组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
