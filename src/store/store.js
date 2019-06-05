import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

//Defind Modules
import auth from './modules/auth'
import uinfo from './modules/uinfo'
import detail from './modules/detail'
import chat from './modules/chat'
import online from './modules/onlineUser'
import flexible from './flexible'

Vue.use(Vuex)

const state = new Vuex.Store({
  plugins: [createPersistedState({
    key: 'info',
    paths: ['uinfo', 'authData', 'online']
  },{
    key: 'com',
    paths: ['online']
  })],
  modules: {
    authData: auth,
    uinfo: uinfo,
    userDetail: detail,
    chats: chat,
    online: online,
    flexible_interest_module: flexible
  }
})

export default state
