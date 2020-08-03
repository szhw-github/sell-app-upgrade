import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import 'stylus/reset.css'
import 'stylus/border.css'
import 'stylus/style.css'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
