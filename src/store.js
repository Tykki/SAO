import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import jwt from 'jsonwebtoken'
import pub from '../static/JWT_SIGNING_KEY.pub'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUser: { resourceGroups: [], notifications: [], notesDisplayed: [], notesUnseen: 0, notesPriority: [], token: null },
    formInputs: {
      sortMeta: (state, keyName, items) => {
        state.formInputs.event[keyName] = items
          .map(item => { return {value: item.id, text: item.name} })
      },
      event: {
        audiences: [],
        categories: [],
        departments: [],
        status: [],
        locations: []
      },
      notes: {}
    },
    hoverPack: {
      hoverFocus: null,
      txtColor (i) {
        if (this.hoverFocus === i) {
          return 'white'
        }
        if (i % 2 === 0) {
          return 'success'
        } else { return 'secondary4' }
      },
      bgColor (i) {
        if (this.hoverFocus === i) {
          return 'prime2'
        }
      }
    },
    time (data) { return moment(data) }
  },
  getters: {
    token (state) {
      return state.authUser.token
    },
    email (state) {
      return state.authUser.email
    },
    resGroups (state) {
      return state.authUser.resourceGroups
    },
    eventInputs (state) {
      return state.formInputs.event
    },
    notifications (state) {
      return state.authUser.notifications
    }
  },
  mutations: {
    SAVE_TOKEN (state, token) {
      jwt.verify(token, pub, { algorithms: ['RS256'] }, (err, data) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            localStorage.removeItem('token')
          }
          if (err.name === 'JsonWebTokenError') {
            localStorage.removeItem('token')
          }
          return router.replace('500')
        } else {
          state.authUser = Object.assign({}, data, {resourceGroups: [], notifications: [], notesDisplayed: [], notesUnseen: 0, notesPriority: [], token: token})
        }
      })
    },
    KILL_TOKEN (state) {
      state.authUser.token = null
      localStorage.removeItem('token')
      window.location.href = 'https://websrvcs.sa.uic.edu/api/sao/auth/logout'
      this.$router.push('Logout')
    },
    BUILD_USER (state) {
      fetch(`https://websrvcs.sa.uic.edu/api/sao/posts/announcements/?since=2018-08-08&token=${state.authUser.token}`).then(res => res.json()).then((data) => {
        state.authUser.notifications = data
        state.authUser.notesDisplayed = data.slice(0, 6)
        state.authUser.notesUnseen = 0
      })

      fetch(`https://websrvcs.sa.uic.edu/api/sao/posts/announcements/?since=2018-08-08&priority=1&token=${state.authUser.token}`).then(res => res.json())
        .then((data) => {
          state.authUser.notesPriority = data.slice(0, 4).reverse()
        })

      fetch(`https://websrvcs.sa.uic.edu/api/sao/user/${state.authUser.netid}`, { headers: { 'Authorization': 'supersecret' } }).then(res => res.json()).then(data => {
        Object.keys(data).forEach(i => {
          if (i === 'resourceGroups') {
            state.authUser.resourceGroups = data[i]
          }
        })
        // (data, (i, v) => {
        //   // console.log(i, v)
        //   if (i === 'resourceGroups') {
        //     state.authUser.resourceGroups = v
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
      })
    },
    FORM_INFO (state) {
      fetch(`https://websrvcs.sa.uic.edu/api/sao/events/metadata/?token=${state.authUser.token}`).then(function (res) {
        return res.json()
      }).then(data => {
        Object.keys(data).forEach(i => {
          state.formInputs.sortMeta(state, i, data[i])
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
      commit('BUILD_USER')
    },
    newNote ({commit}, mess) {
      commit('NEW_NOTE', mess)
    },
    formInfo ({commit}) {
      commit('FORM_INFO')
    }
  }
})
