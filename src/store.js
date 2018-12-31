import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import pub from '../static/JWT_SIGNING_KEY.pub'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUser: {},
    time () { return moment() }
  },
  getters: {

  },
  mutations: {
    SAVE_TOKEN (state, token) {
      state.authUser.token = token
    },
    BUILD_USER (state) {
      fetch(`https://websrvcs.sa.uic.edu/api/sao/announcements/?since=2018-08-08&token=${state.authUser.token}`).then(res => res.json()).then((data) => {
        state.authUser.notifications = data
        state.authUser.notesDisplayed = data.slice(0, 6)
        state.authUser.notesUnseen = 0
      })

      fetch(`https://websrvcs.sa.uic.edu/api/sao/announcements/?since=2018-08-08&priority=1&token=${state.authUser.token}`).then(res => res.json())
        .then((data) => {
          state.authUser.notesPriority = data.slice(0, 4).reverse()
        })

      // fetch(`./static/JWT_SIGNING_KEY.pub`).then(res => console.log(res.json()))
      fetch('https://randomuser.me/api/').then((res) => res.json()).then((data) =>
        $.each(data, (i, v) => {
          // console.log(i, v)
          if (i === 'results') {
            // console.log(v[0].picture.thumbnail)
            state.authUser.avi = v[0].picture.thumbnail
            $('#avatar').attr('src', state.authUser.avi)
            $('#avatar').show()
          }
        }
        ))
      // const test = jwt.decode(state.authUser.token, {complete: true})
      // console.log(test.payload)
      jwt.verify(state.authUser.token, pub, { algorithms: ['RS256'] }, (err, data) => {
        if (err) {
          // console.log('Aww Snap Son! =[')
          console.error(err)
          return state.$router.replace('500')
        }
        $.each(data, (i, v) => {
          // console.log(i, v)
          if (i === 'givenName') {
            state.authUser.givenName = v
          }
          if (i === 'surname') {
            state.authUser.surname = v
          }
          if (i === 'email') {
            state.authUser.email = v
          }
          if (i === 'uin') {
            state.authUser.uin = v
          }
          if (i === 'displayName') {
            state.authUser.displayName = v
          }
          if (i === 'email') {
            state.authUser.email = v
          }
          if (i === 'groups') {
            state.authUser.groups = v
          }
          if (i === 'netid') {
            state.authUser.netid = v
          }
        })
      })
      fetch(`https://websrvcs.sa.uic.edu/api/sao/user/${state.authUser.netid}`, { headers: { 'Authorization': 'supersecret' } }).then(res => res.json()).then(data => {
        $.each(data, (i, v) => {
          // console.log(i, v)
          if (i === 'resourceGroups') {
            state.authUser.resourceGroups = v
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
    NEW_NOTE (state, mess) {
      state.authUser.notesUnseen++
      if (mess.priority === 1) {
        state.authUser.notesPriority.push(mess)
        state.authUser.notesPriority.shift()
        state.authUser.notesDisplayed.unshift(mess)
        state.authUser.notesDisplayed.pop()
        state.authUser.notifications.unshift(mess)
      } else {
        state.authUser.notesDisplayed.unshift(mess)
        state.authUser.notesDisplayed.pop()
        state.authUser.notifications.unshift(mess)
      }
    }
  },
  actions: {
    buildUser ({commit}) {
      return commit('BUILD_USER')
    },
    newNote ({commit}, mess) {
      commit('NEW_NOTE', mess)
    }
  }
})