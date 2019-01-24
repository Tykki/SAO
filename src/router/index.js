import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Notifications from '@/components/Notifications'
// import Test from '@/assets/vue/UpcomingModal'
import NotificationsForm from '@/components/NotificationsForm'
import ErrPage500 from '@/components/ErrPage500'
import EventForm from '@/apps/eventCollab/EventCollab'
import Viewer from '@/apps/eventViewer/Viewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/token=*',
      component: Dashboard
    },
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Dashboard
    },
    {
      path: '/settings',
      name: 'settings',
      component: Dashboard
    },
    {
      path: '/Logout',
      name: 'Logout',
      component: Dashboard
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications
    },
    // {
    //   path: '/test',
    //   name: 'Test App',
    //   component: Test
    // },
    {
      path: '/notifications-form',
      name: 'NotificationsForm',
      component: NotificationsForm
    },
    {
      path: '/500',
      name: 'Error Page 500',
      component: ErrPage500
    },
    {
      path: '/form',
      name: 'Event Form',
      component: EventForm,
      props: true
    },
    {
      path: '/resource*',
      name: 'resource',
      component: Dashboard
    },
    {
      path: '/viewer',
      name: 'Viewer',
      component: Viewer
    }
  ]
})
