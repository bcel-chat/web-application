const state = {
    reciever: '',
    roomcheck: null,
    message: null,
    typing: '',
    online: null,
    picture: [],
    pictureorigin: null
}

const getters = {
    reciever: state => state.reciever,
    roomcheck: state => state.roomcheck,
    message: state => state.message,
    typing: state => state.typing,
    online: state => state.online,
    picture: state => state.picture,
    pictureorigin: state => state.pictureorigin,
    clearpicture: state => state.clearpicture,
}

const mutations = {
    set_reciever(state, data){state.reciever = data},
    set_roomcheck(state, data){state.roomcheck = data},
    set_message(state, data){state.message = data},
    SET_TYPING(state, data) {state.typing = data},
    SET_ONLINE(state, data) {state.online = data},
    SET_PICTURE(state, data) {state.picture.push(data)},
    SET_PICTUREORIGIN(state, data) {state.pictureorigin = data},
    SET_CLEARPICTURE(state, data) {state.picture = data},
}

const actions = {
    reciever({commit}, data){
        commit('set_reciever',data)
    },
    roomcheck({commit}, data){
        commit('set_roomcheck',data)
    },
    message({commit}, data){
        commit('set_message',data)
    },
    typing({commit}, data) {
        commit('SET_TYPING', data)
    },
    online({commit}, data) {
        commit('SET_ONLINE', data)
    },
    picture({commit}, data) {
        commit('SET_PICTURE', data)
    },
    pictureorigin({commit}, data) {
        commit('SET_PICTUREORIGIN', data)
    },
    clearpicture({commit}, data) {
        commit('SET_CLEARPICTURE', data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}