import Vue from 'vue'
import Applys from './Applys.vue'

import './adminlte/basic.css'
import './adminlte/basic'



Vue.config.productionTip = false

new Vue({
  render: h => h(Applys)
}).$mount('#app')
