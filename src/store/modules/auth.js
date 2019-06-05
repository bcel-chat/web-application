  const state = {
    user: null,
    rest: null
  }

  const getters = {
    user: state => state.user,
    rest: state => state.rest
  }

  const mutations = {
    SET_AUTH(state, data) {
      state.user = data
    },
    SET_REST(state, data) {
      state.rest = data
    }
  }

  const actions = {
    login({commit}, user) {commit('SET_AUTH', user)},
    rest({commit}, rest) {commit('SET_REST', rest)}
  }

  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }