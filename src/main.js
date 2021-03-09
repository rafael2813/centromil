import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  axios,
  VueAxios,
  render: h => h(App),
  store,
}).$mount('#app')
