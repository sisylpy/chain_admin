import Vue from 'vue'
import Login from './Login.vue'

import './adminlte/basic.css'
import './adminlte/basic'



Vue.config.productionTip = false

new Vue({
  render: h => h(Login)
}).$mount('#app')
