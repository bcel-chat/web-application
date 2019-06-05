  const state = {
    uinfo: {
      desc: '',
      display: '',
      uid: ''
    },
    pic: '',
  }

  const getters = {
    uinfo: state => state.uinfo,
    pic: state => state.pic
  }

  const mutations = {
    SET_UINFO(state, data) {
      state.uinfo = data
    },
    SET_DISPLAY(state, data) {
      state.uinfo.display = data
    },
    SET_DESC(state, data) {
      state.uinfo.desc = data
    },
    SET_PIC(state, data) {
      state.pic = data
    }
  }

  const actions = {
    uinfo({commit}, uinfo) {
      commit('SET_UINFO', uinfo)
    },
    display({commit}, data) {
      commit('SET_DISPLAY', data)
    },
    desc({commit}, data) {
      commit('SET_DESC', data)
    },
    pic({commit}, pic) {
      commit('SET_PIC', pic)
    }
  }

  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }