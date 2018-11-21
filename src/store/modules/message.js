const state = {
  sessionList: []
}
const getters = {
  sessionList (state) {
    console.log('get', state.sessionList)
    return state.sessionList
  }
}
const actions = {
}
const mutations = {
  setSessionList (state, sessionList) {
    console.log(sessionList)
    state.sessionList = sessionList
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
