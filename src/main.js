import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vueLayer from 'vue-layer'
import EhsChatClient from 'ehs-chat-client'
// import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false
Vue.prototype.$layer = vueLayer(require('vue/dist/vue'))
Vue.prototype._ = require('lodash')
const whiteRouteList = ['Login']
router.beforeEach((to, form, next) => {
  const userToken = store.getters['user/userToken']
  const appId = store.getters['user/appId']
  const userId = store.getters['user/userId']
  if ((!userToken || !appId || !userId) && whiteRouteList.indexOf(to.name) === -1) {
    next({ name: 'Login' })
  } else {
    if (!Vue.prototype.$ehsChatClient) {
      Vue.prototype.$ehsChatClient = new EhsChatClient(appId, userToken, 'http://192.168.0.103:3000')
    }
    next()
  }
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
