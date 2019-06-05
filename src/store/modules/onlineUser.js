const state = {
    online: []
}

const getters = {
    online: state => state.online,
}

const mutations = {
    SET_ONLINE(state, data) {state.online = data}
}

const actions = {
    online({commit}, data) {
        commit('SET_ONLINE', data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}