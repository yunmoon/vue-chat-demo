import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})

const state = {
  appId: Vue.ls.get('appId'),
  userToken: Vue.ls.get('user-token'),
  userId: Vue.ls.get('userId')
}

const getters = {
  userId (state) {
    return state.userId
  },
  userToken (state) {
    return state.userToken
  },
  appId (state) {
    return state.appId
  }
}

const actions = {
}

const mutations = {
  setUserToken (state, userToken) {
    state.userToken = userToken
    Vue.ls.set('user-token', userToken)
  },
  setAppId (state, appId) {
    state.appId = appId
    Vue.ls.set('appId', appId)
  },
  setUserId (state, userId) {
    state.userId = userId
    Vue.ls.set('userId', userId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
