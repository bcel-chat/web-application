import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import ds from '../helper/deepstream'
import chat from './chat'

Vue.use(Router)
var routers = []
routers = routers.concat(chat)
const routes = routers

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  sessionStorage.setItem('flexible_root_router', '/chats');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if not login yet   
    if (!store.state.uinfo.uinfo) {
      next({
        path: '/login'
      })
    } else {
      // if already login
      const user = store.state.authData.user

      if (user == null) {
        next({
          path: '/login'
        })
        return
      }

      // if refresh browser
      if (from.name === null) {
        store.dispatch('authData/rest', false)
        ds.login({
            user: user.user,
            password: user.password
          },
          success => {
            if (success) next()
          }
        )
      } else {
        next()
      }
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router