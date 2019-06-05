  const state = {
    fth: 62,
    detail: null,
    contextActive: false,
    context: {
      y: '0px',
      x: '0px'
    },
    sidebar: {
      sidenewchat: false,
      sidenewgroup: false,
      sidegroupprofile: false,
      sideprofile: false,
    },
    sidetochat: false,
    sidewidth: 0,
    searchbox: '',
    contact: [],
    contactgroup: [],
    members: null,
    tabs: 1,
    contactinfo: null,
    filepanel: {
      emoji: false,
      picture: false,
      file: false
    },
    filepath: null,
    bgactive: {
      status: false,
      rid: null
    },
    grid: null,
    mobile: null
  }

  const getters = {
    fth: state => state.fth,
    detail: state => state.detail,
    context: state => state.context,
    contextActive: state => state.contextActive,
    sidebar: state => state.sidebar,
    sidetochat: state => state.sidetochat,
    sidewidth: state => state.sidewidth,
    searchbox: state => state.searchbox,
    contact: state => state.contact,
    contactgroup: state => state.contactgroup,
    tabs: state => state.tabs,
    contactinfo: state => state.contactinfo,
    filepanel: state => state.filepanel,
    filepath: state => state.filepath,
    bgactive: state => state.bgactive,
    grid: state => state.grid,
    members: state => state.members,
    mobile: state => state.mobile
  }

  const mutations = {
    SET_FTH(state, data) {state.fth = data},
    SET_DETAIL(state, data) {state.detail = data},
    SET_CONTEXT(state, data) {state.context = data},
    SET_CONTEXTACTIVE(state, data) {state.contextActive = data},
    SET_SIDEBAR(state, data) {state.sidebar = data},
    SET_SIDETOCHAT(state, data) {state.sidetochat = data},
    SET_SIDEWIDTH(state, data) {state.sidewidth = data},
    SET_SEARCHBOX(state, data) {state.searchbox = data},
    SET_CONTACT(state, data) {state.contact = data},
    SET_CONTACTGROUP(state, data) {state.contactgroup = data},
    SET_TABS(state, data) {state.tabs = data},
    SET_CONTACTINFO(state, data) {state.contactinfo = data},
    SET_FILEPANEL(state, data) {state.filepanel = data},
    SET_FILEPATH(state, data) {state.filepath = data},
    SET_CLEARFILEPATH(state, data) {state.filepath.value = data},
    SET_BGACTIVE(state, data) {state.bgactive = data},
    SET_GRID(state, data) {state.grid = data},
    SET_MEMBERS(state, data) {state.members = data},
    SET_MOBILE(state, data) {state.mobile = data}
  }

  const actions = {
    fth({commit}, data) {
      commit('SET_FTH', data)
    },
    detail({commit}, data) {
      commit('SET_DETAIL', data)
    },
    context({commit}, data) {
      commit('SET_CONTEXT', data)
    },
    contextActive({commit}, data) {
      commit('SET_CONTEXTACTIVE', data)
    },
    sidebar({commit}, data) {
      commit('SET_SIDEBAR', data)
    },
    sideToChat({commit}, data) {
      commit('SET_SIDETOCHAT', data)
    },
    sidewidth({commit}, data) {
      commit('SET_SIDEWIDTH', data)
    },
    searchbox({commit}, data) {
      commit('SET_SEARCHBOX', data)
    },
    contact({commit}, data) {
      commit('SET_CONTACT', data)
    },
    contactgroup({commit}, data) {
      commit('SET_CONTACTGROUP', data)
    },
    tabs({commit}, data) {
      commit('SET_TABS', data)
    },
    contactinfo({commit}, data) {
      commit('SET_CONTACTINFO', data)
    },
    filepanel({commit}, data) {
      commit('SET_FILEPANEL', data)
    },
    filepath({commit}, data) {
      commit('SET_FILEPATH', data)
    },
    clearfilepath({commit}, data) {
      commit('SET_CLEARFILEPATH', data)
    },
    bgactive({commit}, data) {
      commit('SET_BGACTIVE', data)
    },
    _grid({commit}, data) {
      commit('SET_GRID', data)
    },
    members({commit}, data) {
      commit('SET_MEMBERS', data)
    },
    mobile({commit}, data) {
      commit('SET_MOBILE', data)
    }
  }

  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }