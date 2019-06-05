import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './store/store'
import './helper/registerServiceWorker'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'
import './assets/scss/theme.scss'
import 'animate.css/animate.min.css'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
import animate from 'animate.css/animate.min.css'
import moment from 'vue-moment'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentAlt, faAddressCard, faExpandArrowsAlt, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCommentAlt, faAddressCard, faExpandArrowsAlt, faBell)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(moment)
Vue.use(animate)
Vue.use(VueLodash, lodash)
Vue.use(Buefy)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')