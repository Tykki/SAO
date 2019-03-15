<template>
  <div id="app">
    <section class="text-center" v-if="!token">
      <img src="./assets/sa_small.png" alt="SA Online Banner">
      <h1>You may not be authorized to access this application. Please seek your UIC web Admin for more details.</h1>
    </section>
    <section v-else>
      <sao-header @logout="reqLogout()" />
      <side-nav @logout="reqLogout()" />
      <router-view id="display" />
      <sao-footer />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import Footer from '@/components/Footer'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  beforeCreate () {
    let token = window.location.hash.split('=')[1]
    localStorage.getItem('token') ? null : (token ? localStorage.setItem('token', token) : window.location.href = 'https://websrvcs.sa.uic.edu/api/sao/auth?request-uri=localhost:8080')
    // token ? (localStorage.getItem('token') ? null : localStorage.setItem('token', token)) :
    // if (token === null || token === undefined) {
    //   if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
    //     window.location.href = 'https://websrvcs.sa.uic.edu/api/sao/auth'
    //     return
    //   }
    // }
    // if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
    //   localStorage.setItem('token', token)
    // }
  },
  created () {
    this.$store.commit('SAVE_TOKEN', localStorage.getItem('token'))
    this.buildUser()
    this.formInfo()
  },
  mounted () {
    this.initWebSocket()
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(['newNote', 'buildUser', 'formInfo']),
    initWebSocket () {
      const sudo = this
      const socket = new WebSocket(`wss://websrvcs.sa.uic.edu/api/sao/posts/announcements/realtime/?since=2018-08-08&token=${this.token}`)
      // Connection error
      socket.addEventListener('error', function (event) {
        console.log('Error from server ', event)
      })
      // Connection opened
      socket.addEventListener('open', function (event) {
        console.log('Open from server ', event)
      })
      // Listen for messages
      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data)
        let message = JSON.parse(event.data.split('|')[1])

        if (message.err) {
          console.error(message.err)
          // console.log(this)
        } else {
          console.log(message, message.priority)
          sudo.newNote(message)
        }
      })
    },
    reqLogout () {
      this.$store.commit('KILL_TOKEN')
    }
  },
  components: {
    'sao-header': Header,
    'side-nav': SideNav,
    'sao-footer': Footer
  }
}
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";

</style>
