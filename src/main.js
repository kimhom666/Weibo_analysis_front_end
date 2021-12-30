// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
// import global from './global';
echarts.registerMap('china', china)



Vue.config.productionTip = false
// Vue.prototype.global = global;

Vue.prototype.$echarts = echarts

require('echarts-wordcloud')

axios.defaults.baseURL = "http://localhost:8083"
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
