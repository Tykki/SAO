// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import err500 from './ErrPage500'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'font-awesome-animation/dist/font-awesome-animation.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { faRocket, faAngleDown, faAngleRight, faSignOutAlt, faBell, faAngleDoubleLeft, faBars, faTachometerAlt, faLink, faUser, faCog, faSuitcase, faHandshake, faChevronDown, faChevronRight, faCircleNotch, faSyncAlt, faChevronUp, faPlus, faMinus, faSync, faEnvelope, faPowerOff, faSearch, faTimes, faPhone, faComments, faTableTennis, faDesktop, faComment, faCalendarAlt, faBullhorn, faList, faBookmark, faTasks, faUserCog, faUsersCog } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope as farEnvelope, faUser as farUser, faEdit, faTrashAlt, faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'
import { faFacebookF, faTwitter, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import 'jquery-ui/ui/widgets/datepicker'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/datepicker.css'
import 'jquery-ui/themes/base/theme.css'
library.add(faRocket, faSignOutAlt, faBell, faAngleDown, faAngleRight, faAngleDoubleLeft, faBars, faTachometerAlt, faLink, faUser, faCog, faSuitcase, faHandshake, faChevronDown, faChevronRight, faCircleNotch, faSyncAlt, faChevronUp, faPlus, faMinus, faSync, faEnvelope, farEnvelope, farUser, faPowerOff, faSearch, faTimes, faFacebookF, faTwitter, faYoutubeSquare, faPhone, faEdit, faComments, faTableTennis, faDesktop, faComment, faCalendarAlt, faTrashAlt, faBullhorn, faList, faBookmark, farBookmark, faTasks, faUserCog, faUsersCog)
Vue.filter('truncate', (str, length = 40) => { return (str.length <= length) ? str : `${str.substring(0, length - 3)}...` })
Vue.filter('capitalize', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.component('date-picker', datePicker)
Vue.component('icon', FontAwesomeIcon)
Vue.component('icon-layers', FontAwesomeLayers)
Vue.component('icon-layers-text', FontAwesomeLayersText)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle'
  }
})

$(function () {
  $('#datepicker').datepicker()
  $('#anim').on('change', function () {
    $('#datepicker').datepicker('option', 'showAnim', $(this).val())
  })
})

// $(window).resize(() => {
//   // When window is resized to meet the breakpoint of the media query, forcably
//   // change the width to 100%, else have it set to the initial 300px
//   // Case 1 fix
//   if ($(window).width() <= 767) {
//     // the equals is important! without the '=' at 767px the screen breaks
//     // with both css styles trying to be prevalent.
//     $('nav.nav-side-menu').css('width', '100%')
//     $('#display').width('')
//   // if($('#toggle-wrap.active')){
//   //     $('#toggle-wrap').removeClass('active');
//   // }
//   }
//   if ($(window).width() > 767) {
//     $('nav.nav-side-menu').css('width', '300px')
//   // if($('#toggle-wrap')){
//   //     }
//   }
//   // $('#display').width('calc(100% - 300px)');
// })

/* eslint-disable */
window.myApp = new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App, err500 }
})
