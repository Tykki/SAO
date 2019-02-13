<template>
  <div id="app">
    <section class="text-center" v-if="!token">
      <img src="./assets/sa_small.png" alt="SA Online Banner">
      <h1>You may not be authorized to access this application. Please seek your UIC web Admin for more details.</h1>
    </section>
    <section v-else>
      <sao-header @logout="Reqlogout()" />
      <side-nav @logout="Reqlogout()" />
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
// import jwt from 'jsonwebtoken'
// import pub from '../static/JWT_SIGNING_KEY.pub'
// import moment from 'moment'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  beforeCreate () {
    let token = window.location.hash.split('=')[1]
    if (token === null || token === undefined) {
      if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        // console.log('No Token BOI')
        window.location.href = 'https://websrvcs.sa.uic.edu/api/sao/auth'
        return
      }
    }
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      localStorage.setItem('token', token)
    }
  },
  created () {
    // this.$set(this.authUser, 'token', localStorage.getItem('token'))
    this.$store.commit('SAVE_TOKEN', localStorage.getItem('token'))
    // console.log(this.authUser.token)
    // if (token === null || token === undefined) {
    //   console.log('no token boi!')
    // }
    this.buildUser()
    this.formInfo()
  },
  mounted () {
    this.webSocket()
  },
  watch: {
    token () {
      if (this.token === null || this.token === undefined) {
        console.log('You have no Token fam')
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(['newNote', 'buildUser', 'formInfo']),
    webSocket () {
      const sudo = this
      const socket = new WebSocket(`wss://websrvcs.sa.uic.edu/api/sao/announcements/ws/?since=2018-08-08&token=${this.token}`)
      // Connection opened
      socket.addEventListener('open', function (event) {
        console.log('Open from server ', event)
        // socket.send('Hello')
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
    // time () { return moment },
    Reqlogout () {
      // this.authUser.token = null
      console.log(this)
      this.$store.commit('KILL_TOKEN')
      localStorage.removeItem('token')
      this.$router.push('Logout')
      window.location.href = 'https://websrvcs.sa.uic.edu/api/sao/auth/logout'
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
