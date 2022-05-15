import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import 'vue-area-linkage/dist/index'


Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://10.251.254.228/api';
Vue.use(ElementUI)
Vue.use(VueResource)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')