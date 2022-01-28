import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import HighchartsVue from 'highcharts-vue'

Vue.use(ElementUI, { locale })
Vue.use(HighchartsVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
