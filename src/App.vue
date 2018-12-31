<template>
  <div id="app">
    <section class="text-center" v-if="!authUser.token">
      <img src="./assets/sa_small.png" alt="SA Online Banner">
      <h1>You may not be authorized to access this application. Please seek your UIC web Admin for more details.</h1>
    </section>
    <section v-else>
      <sao-header @logout="Reqlogout()" :user="authUser"/>
      <side-nav @logout="Reqlogout()" :resources="authUser.resourceGroups" />
      <router-view :time="time" :authUser="authUser"></router-view>
      <sao-footer />
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import Footer from '@/components/Footer'
import jwt from 'jsonwebtoken'
import pub from '../static/JWT_SIGNING_KEY.pub'
// import moment from 'moment'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  // beforeCreate () {
  //   let token = window.location.hash.split('=')[1]
  //   if (token === null || token === undefined) {
  //     if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
  //       // console.log('No Token BOI')
  //       window.location.href = 'https://websrvcs.sa.uic.edu/api/sao/auth'
  //       return
  //     }
  //   }
  //   if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
  //     localStorage.setItem('token', token)
  //   }
  // },
  created () {
    // this.$set(this.authUser, 'token', localStorage.getItem('token'))
    this.$store.commit('SAVE_TOKEN', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFla3dlajJAdWljLmVkdSIsImRpc3BsYXlOYW1lIjoiRWt3ZWp1bm9yLUV0Y2hpZSwgQXlpcmkgRXJ1dnV3IiwibmV0aWQiOiJhZWt3ZWoyIiwidWluIjoiNjU1NDQwODIzIiwiZ2l2ZW5OYW1lIjoiQXlpcmkiLCJzdXJuYW1lIjoiRWt3ZWp1bm9yLUV0Y2hpZSIsImdyb3VwcyI6WyJETC1BbGwgTmV0SURzIiwiREwtWFAgTGFiIFVzZXJzIiwiR0ctQVRMQVNTSUFOIEJBTUJPTyIsIkdHLUFUTEFTU0lBTiBCSVRCVUNLRVQiLCJHRy1BVExBU1NJQU4gQ09ORkxVRU5DRSIsIkdHLUFUTEFTU0lBTiBERVYiLCJHRy1BVExBU1NJQU4gREVWLVNUVURFTlQiLCJHRy1BVExBU1NJQU4gU0VSVklDRURFU0siLCJHRy1BVExBU1NJQU4gU09GVFdBUkUiLCJHRy1BVExBU1NJQU4gVVNFUlMiLCJHRy1BVExBU1NJQU4gV0VCIiwiR0ctQVRMQVNTSUFOIFdFQi1TVFVERU5UIiwiR0ctVkNTQS1FdmVyeW9uZSIsIkdHLVhQIExhYiBVc2VycyIsImdnLXNhLXNjLWdyYXBoaWNzIiwiZ2ctdmNzYS1XZWIgRGV2ZWxvcGVyIiwiZ2ctdmNzYS12Y3NhLXN0YWZmIl0sImlhdCI6MTU0NjIzMjcwMSwiZXhwIjoxNTQ3NDQyMzAxLCJpc3MiOiJodHRwczovL3dlYnNydmNzLnNhLnVpYy5lZHUvYXBpL3Nhby9hdXRoIn0.bTslo4cZU9OXqIHK0q8TTeX93FWS9pTr4cSj3y61edZBFF2yEyzxLUIscIm8bJq9pwT8cMmpO2T-h7BnfuaNiyP2t4EHJI2M9Jwk204Cn-lr8UFO2Xs2Mo0pl39dNiSDhel3wZ7450WxT0jJup30ojWjFRyewLkzGAiDm5KhNTOZBu9sioLLWfyk95TKVCRFx_GBkuF1VoPgWxliq9G2IUVhoqF6P3o0HRYqQRVATXksYpSifYmRAdV1mns4QQaDIc4SF7B4W8F3Djsme0eUQqgWFFCuXC_uOqYdzjb3OYP9rXBIJ-yuzDIXu3hoFGwlPNcTNUbfGh1c7bQqgkz8pg')
    // this.$store.commit('SAVE_TOKEN', localStorage.getItem('token'))
    // console.log(this.authUser.token)
    // if (token === null || token === undefined) {
    //   console.log('no token boi!')
    // }
    // this.buildUser()
    fetch(`https://websrvcs.sa.uic.edu/api/sao/announcements/?since=2018-08-08&token=${this.authUser.token}`).then(res => res.json()).then((data) => {
      this.$set(this.authUser, 'notifications', data)
      this.$set(this.authUser, 'notesDisplayed', data.slice(0, 6))
      this.$set(this.authUser, 'notesUnseen', 0)
    })

    fetch(`https://websrvcs.sa.uic.edu/api/sao/announcements/?since=2018-08-08&priority=1&token=${this.authUser.token}`).then(res => res.json())
      .then((data) => {
        this.$set(this.authUser, 'notesPriority', data.slice(0, 4).reverse())
      })

    // fetch(`./static/JWT_SIGNING_KEY.pub`).then(res => console.log(res.json()))
    fetch('https://randomuser.me/api/').then((res) => res.json()).then((data) =>
    $.each(data, (i, v) => {
      // console.log(i, v)
      if (i === 'results') {
        // console.log(v[0].picture.thumbnail)
        const avi = v[0].picture.thumbnail
        $('#avatar').attr('src', avi)
        $('#avatar').show()
      }
    }
    ))
    // const test = jwt.decode(this.authUser.token, {complete: true})
    // console.log(test.payload)
    jwt.verify(this.authUser.token, pub, {algorithms: ['RS256']}, (err, data) => {
      if (err) {
        // console.log('Aww Snap Son! =[')
        console.error(err)
        return this.$router.replace('500')
      }
      $.each(data, (i, v) => {
        // console.log(i, v)
        if (i === 'givenName') {
          this.$set(this.authUser, 'givenName', v)
        }
        if (i === 'surname') {
          this.$set(this.authUser, 'surname', v)
        }
        if (i === 'email') {
          this.$set(this.authUser, 'email', v)
        }
        if (i === 'uin') {
          this.$set(this.authUser, 'uin', v)
        }
        if (i === 'displayName') {
          this.$set(this.authUser, 'displayName', v)
        }
        if (i === 'email') {
          this.$set(this.authUser, 'email', v)
        }
        if (i === 'groups') {
          this.$set(this.authUser, 'groups', v)
        }
        if (i === 'netid') {
          this.$set(this.authUser, 'netid', v)
        }
      })
    })
    fetch(`https://websrvcs.sa.uic.edu/api/sao/user/${this.authUser.netid}`, {headers: {'Authorization': 'supersecret'}}).then(res => res.json()).then(data => {
      $.each(data, (i, v) => {
        // console.log(i, v)
        if (i === 'resourceGroups') {
          this.$set(this.authUser, 'resourceGroups', v)
          // When the resource Groups are found, delete the placeholders due to having content now.
          // $('#rGroup').remove()
          // $('#ResourseGroup').remove()
          // for (i = 0; i < v.length; i++) {
          //     // When the resource Groups are found, loop through the array length to track and
          //     // create the amount of First lvl li tags needed for user. Uncomment the consol.log(i)
          //     // to view how many times the loop will iterate due to resourse Group length.
          //     // console.log(i)
          //   let t = 0
          //   $('.prof').before(`<li id="rG${i}" data-toggle="collapse" data-target="#Gr${i}" class="collapsed">
          //   <a href="#"><i class="${v[i].icon}"></i> <strong id="rN${i}"> ${v[i].name}</strong> <span class="arrow"></span></a></li><ul class="sub-menu collapse" id="Gr${i}"></ul>`)
          //   for (let resource of v[i].resources) {
          //       // console.log(t)
          //       // After a resource group li has been created from code above, populate it's corrisponding ul tag resources
          //       // by looping through the given resources and creating dynamic html.
          //       // Uncomment console.log() below to view the name of the resource with the group number
          //       // console.log(i, resource.name)
          //     $(`#Gr${i}`).append(`<li><a id=r${t} href="${resource.url}" target="_blank">${resource.name}</a></li>`)
          //     t++
          //   }
          // }
        }
      })
    })
  },
  mounted () {
    this.webSocket()
  },
  watch: {
    authUser (event) {
      // console.log(event)
    }
  },
  computed: {
    ...mapState(['authUser', 'time'])
  },
  methods: {
    ...mapActions(['newNote', 'buildUser']),
    webSocket () {
      const sudo = this
      const socket = new WebSocket(`wss://websrvcs.sa.uic.edu/api/sao/announcements/ws/?since=2018-08-08&token=${this.authUser.token}`)
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
      this.authUser.token = null
      localStorage.removeItem('token')
      this.$router.push('Logout')
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
