import store from '../store/store'
const Home = ()=> import('@/views/home/Home.vue')
const Login = ()=> import('@/views/auth/Auth.vue')
import flexible from './flexible'

 const route = [
   {
      path: '*',
      redirect: {
        name: 'chats'
      },
    },
    {
      path: '/chats',
      name: 'chats',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: flexible
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.state.authData.user) {
          next({
            path: '/home'
          })
        } else {
          next()
        }
      }
    }
  ]

export default route