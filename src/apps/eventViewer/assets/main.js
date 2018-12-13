// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
// import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'jquery-ui/themes/base/core.css'
// import 'jquery-ui/themes/base/theme.css'
// import 'jquery-ui/themes/base/datepicker.css'
// import 'jquery-ui/ui/core'
// import 'jquery-ui/ui/widgets/datepicker'
import 'babel-polyfill'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome/index.js'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faChevronDown, faChevronRight, faCircleNotch, faSyncAlt, faChevronUp, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import {faGrav, fa500px} from '@fortawesome/free-brands-svg-icons'

// import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

// window.jQuery = jquery
// window.$ = jquery

Vue.config.productionTip = false


library.add(faChevronDown, faChevronRight, faCircleNotch, faSyncAlt,  faChevronUp, faGrav, faPlus, faMinus)
Vue.filter('truncate', (str, length=40)=>{return (str.length <= length) ? str : `${str.substring(0,length-3)}...`;});
Vue.component('icon', FontAwesomeIcon)


Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
