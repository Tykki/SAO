<template>
  <header id="header" class="shadow-sm">
    <b-container fluid>
        <b-row >
          <b-col md="4" lg="3" class="justify-content-start">
            <!-- <b-input-group id="headSearch" size="sm" >
              <b-input-group-append class="align-self-center"><icon icon="search"/></b-input-group-append> -->
              <search-modal :resources="authUser.resourceGroups" />
              <!-- <input class="form-control" @keyup.enter="reqSearch" type="search" id="searchBar" placeholder="Search..." size="sm" :value="resourceSearch"/> -->
              <!-- <b-btn @keyup.enter="console.log('ello')" >ello</b-btn> -->
              
            <!-- </b-input-group> -->
          </b-col>
            <!-- <b-col class="justify-content-center">
              
                <h1 class="justify-content-center text-uppercase">{{title}}</h1>  
            </b-col> -->
            <div id="head-icons" class="cols-auto ml-auto align-self-center justify-content-end">

              <!-- <b-link id="messages" href="#" class="">
                    <icon icon="envelope" />
                </b-link> -->

                <b-link @click="authUser.notesUnseen = 0" id="notes" class="">
                  <icon-layers >
                    <icon icon="bell"/>
                    <icon-layers-text v-show="authUser.notesUnseen > 0" class="fa-layers-top-right fa-layers-counter" transform="shrink-3 right-9 down-1" :value="authUser.notesUnseen" />
                  </icon-layers>
                  <!-- <i class="fas fa-bell has-badge" data-count="6"></i> -->
                </b-link>
                <b-link id="aviClick">
                  <!-- <b-img id="avatar" src="" alt="authUser avatar" /> -->
                  <b-img id="avatar" :src="`https://ui-avatars.com/api/?name=${authUser.givenName}+${authUser.surname}`" alt="avatar image" />
                </b-link>
                <span v-if="displayNameHasSpace" id="displayName">{{authUser.displayName}}</span>
                <!-- <b-link id="menuBars" href="#" class="">
                    <icon icon="bars" />
                </b-link> -->
            </div>
        </b-row>
    </b-container>
    
  <b-popover target="aviClick" triggers="click blur" placement="bottom" ref="popoverAvi" >
    <b-list-group flush>
      <b-list-group-item variant="prime2" @click="data.click" v-for="(data, i) of aviData" :key="i">
        <p><icon class="aviIcon" :icon="data.icon" :class="{power: data.icon === 'power-off'}" /> {{data.text}}</p>
      </b-list-group-item>
    </b-list-group>
  </b-popover>

  <b-popover target="notes" triggers="click blur" placement="bottom" ref="popoverNotes" >
    <b-list-group flush>
      <b-list-group-item id="show-all-notes" class="noteItem" variant="prime2" href="#" >
        <b-row align-h="between">
          <b-col cols="8">
            <p><strong>Announcements</strong></p>
          </b-col>
          <b-col cols="">
            <b-link to="/notifications">View All</b-link>
          </b-col>
        </b-row>
      </b-list-group-item>
      <b-list-group-item class="noteItem" variant="prime2" href="#" v-for="(notes, i) of authUser.notesDisplayed" :key="i" @click="showModal(i, notes)">
        <!-- <b-row align-h="end" >
          <icon icon="times" />
        </b-row> -->
        <b-row>
          <b-col cols="1" align-self="center">
            <icon class="noteIcon" icon="comments" :class="" />
          </b-col>
          <b-col style="padding: 0 5px 0 15px;">
            <p><strong>{{notes.title}}</strong> <br />
              {{notes.description | truncate(90)}}<br />
              <small>{{time(notes.created_on).fromNow()}}</small>
            </p>
          </b-col>
        </b-row>
      </b-list-group-item>
      <!-- <b-list-group-item id="show-all-notes" class="noteItem" variant="prime2" to="/notifications" >
        <b-row align-h="between">
          <b-col cols="">
            <p><strong>Show All Notifications</strong></p>
          </b-col>
          <b-col cols="1">
            <icon  class="noteIcon" icon="angle-right" />
          </b-col>
        </b-row>
      </b-list-group-item> -->
    </b-list-group>                  
  </b-popover>

  <b-modal v-for="(notes, i) of authUser.notesDisplayed" :key="i" ok-only ok-title="Close" :ref="`postModal${i}`">
    <post-view class="postModal" :post="notes" />
  </b-modal>
  <!-- <b-popover target="messages" triggers="click blur" placement="bottom" ref="popoverMess" >
    <b-list-group flush>
      <b-list-group-item id="show-all-mess" class="messItem" variant="prime2" href="#" >
        <b-row align-h="between">
          <b-col cols="8">
            <p><strong>Messages</strong></p>
          </b-col>
          <b-col cols="">
            <b-link>View All</b-link>
          </b-col>
        </b-row>
      </b-list-group-item>
      <b-list-group-item class="noteItem" variant="prime2" href="#" v-for="(notes, i) of authUser.notifications.slice(0, 6)" :key="i">
        <b-row align-h="end" >
          <icon icon="times" />
        </b-row>
        <b-row>
          <b-col cols="1" align-self="center">
            <icon class="noteIcon" icon="rocket" :class="" />
          </b-col>
          <b-col style="padding: 0 5px 0 15px;">
            <p><strong>{{notes.title}}</strong><br />
              {{notes.description}}<br />
              <small>{{new Date(notes.created_on).toLocaleDateString("en-US", {'day': 'numeric', 'year': 'numeric', 'month': 'short'} )}} {{new Date(notes.created_on).toLocaleTimeString()}}</small>
            </p>
          </b-col>
          <b-col class="dismiss-note" cols=".5" style="margin-top: -10px;">
          <icon icon="times" />
        </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>                  
  </b-popover> -->
</header>
</template>

<script>
import { mapState } from 'vuex'
import SearchModal from '@/assets/vue/SearchModal'
import PostView from '@/assets/vue/PostView'

export default {
  name: 'sao-header',
  data () {
    return {
      // aviData: [{icon: ['far', 'user'], text: 'My Profile', link: '/profile'}, {icon: ['far', 'envelope'], text: 'Inbox'}, {icon: 'cog', text: 'Settings', link: '/settings'}, {icon: 'power-off', text: 'Logout', link: '/Logout', click: () => { this.$emit('logout') }}],
      aviData: [{icon: 'power-off', text: 'Logout', link: '/Logout', click: () => { this.$emit('logout') }}],
      resourceSearch: ''
    }
  },
  components: {
    'search-modal': SearchModal,
    PostView
  },
  watch: {
    // resourceSearch (event) {
    //   console.log(event)
    // }
  },
  computed: {
    ...mapState(['time', 'authUser']),
    // displayedNotes () {
    //   const listed = Array.from(this.user.notifications)
    //   return listed.slice(0, 6)
    // },
    displayNameHasSpace () {
      if (screen.width > 787) {
        return true
      } else { false }
    }
  },
  methods: {
    reqSearch (event) {
      this.resourceSearch = event.target.value
      console.log(this.resourceSearch)
    },
    showModal (i) {
      // console.log(this.$refs)
      this.$refs[`postModal${i}`][0].show()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #header{
  width: calc(100% - 300px);
  float: right;
  text-align: center;
  height: 50px;
  margin-bottom: 15px;
  color: grey;
  a {
    &:last-child{
      margin: auto 24px auto auto;
    };
      
    &:hover{
      text-decoration: none;
    };
  }
  span{
  font-size: small;
  }
}
.postModal{
  color: initial;
}
  span{
    width: fit-content;
  }
  #displayName{
    color: grey;
    font-weight: 600;
    margin: 0 12px 0 0;
  } 
  #sign-out span{
    font-size: 16px !important;
  }
  #head-icons{
    margin-top: 4px;
    font-size: 21px
  }
  #notes{
    margin: 0 12px;
  }
  #signout{
    margin: 0 12px;
  }
  #avatar{
    margin: 0 12px;
    border-radius: 50%;
    /*margin: auto 24px auto auto;*/
    position: relative;
    z-index: 99;
    max-height: 40px;
    width: 42px;
    background-color: #d8d8d8;
    display: inline-block;
    span{
      font-size: 1.1rem;
    }
    &:hover{
      color: inherit;
    }
  }

  @media screen and (max-width: 767px) {
    #avatar{
      margin: auto;
    }
  }
  
  #aviClick{
    padding-bottom: 15px;
    &:hover{
      color: inherit;
    }
  }
  .dismiss-note{
    color: lightgrey;
  }
  .list-group-item-prime2.list-group-item-action.active{
    border-color: #b8eaf7 !important;
    background-color: #b8eaf7 !important;
  }
  .noteItem{
    border-bottom: solid 2px lightgrey;
    &:last-child{
      border-bottom: none;
    }
  }

</style>
