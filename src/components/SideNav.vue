<template role="navagation">
  <b-nav tag="nav" id="sideNav" class="nav-side-menu shadow" vertical>
    
    <div class="brand">
        <section id="toggle-wrap" @click="iconNavShow" class="faa-parent animated-hover">
          <icon icon="angle-double-left" size="lg" class="faa-passing-reverse faa-fast" />
        </section>
        <section>
            <img id="brand-logo" src="./../assets/sa_small.png" alt="UIC Student Affairs w/ Circle Logo">
        </section>
    </div>
    
    <icon icon="bars" size="2x" class="toggle-btn" data-toggle="collapse" data-target="#menu-content" />
    <div class="menu-list">
        <ul id="menu-content" @click="iconNavClose" class="menu-content collapse out">
            <b-nav-item class="navTitle">
                <small>
                  <strong>Navagations</strong>
                </small>
            </b-nav-item>

            <b-nav-item ref="dashboard" to="/dashboard" @click="setNav('a')" :class="{active: navSet.active === `a`}" class="blink">
              <icon icon="tachometer-alt" size="lg" class="nav-icon" /><strong>Dashboard</strong>
            </b-nav-item>

              <div class="" role="resource-group" v-for="(group, i) of resGroups" :key="i">
                <b-nav-item v-b-toggle="`accordion${i}`" class="nav-item" role="nav-item" :class="{active: navSet.active === i}">
                    <icon :icon="group.icon" size="lg" class="nav-icon" /><strong>{{group.name}}<icon icon="angle-down" size="lg" class="arrow-down" /></strong>
                </b-nav-item>

                <b-collapse tag="ul" class="sub-menu" :id="`accordion${i}`" accordion="resources" role="sub-nav">
                  <b-nav-item v-for="(resource, r) of group.resources" :key="r" class="nav-item" :class="{active: navSet.subLvl === `${i}-${r}`}" @click="setNav(i, r)" :href="resource.isExternal ? resource.url : '#'" target="_blank">
                      <icon icon="angle-right" style="font-weight: 900;" transform="right-12" /><strong class="ml-3">{{resource.name}}</strong>
                  </b-nav-item>
                </b-collapse>
              </div>

            <hr />

            <b-nav-item  class="navTitle">
                <small>
                  <strong>Apps</strong>
                </small>
            </b-nav-item>

            <b-nav-item ref="events" to="/viewer" @click="setNav('b')" :class="{active: navSet.active === `b`}" class="blink">
              <icon icon="calendar-alt" size="lg" class="nav-icon" /><strong>Events Viewer</strong>
            </b-nav-item>
            

            <b-nav-item ref="posts" to="/notifications-form" @click="setNav('c')" :class="{active: navSet.active === `c`}" class="blink">
              <icon icon="comment" size="lg" class="nav-icon" /><strong>Posts</strong>
            </b-nav-item>
            
            <hr/>
            
            <b-nav-item to="/Logout" @click="setNav('z'), logoutReq()" :class="{active: navSet.active === `z`}" class="blink">
                    <icon icon="power-off" size="lg" class="nav-icon" /><strong>Logout</strong>
            </b-nav-item>
        </ul>
    </div>
  </b-nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sideNav',
  data () {
    return {
      navSet: {active: 'a', subLvl: null}
    }
  },
  created () {
  },
  methods: {
    logoutReq () {
      this.$emit('logout')
    },
    setNav (id, sub = null, $event) {
      console.log(event)
      if (sub === null) {
        let subM = $('.sub-menu')
        subM.collapse('hide')
      }
      if (id === null) {
        return
      }
      this.navSet.active = id
      this.navSet.subLvl = `${id}-${sub}`
      if (id === 'a') {
        this.$refs.dashboard.children[0].click()
      }
      if (id === 'b') {
        this.$refs.events.children[0].click()
      }
      if (id === 'c') {
        this.$refs.posts.children[0].click()
      }
      if (sub !== null) {
        event.toElement.firstChild.click()
      }
    },
    iconNavShow (data) {
      // console.log(this, data)
      $('#toggle-wrap').toggleClass('active')
      $('li strong').hide()
      $('.row.footer').hide()
      $('#brand-logo').hide()
      $('span.arrow').hide()
      // $('.brand strong').hide()
      // $('.brand i').toggle()
      if (!$('#toggle-wrap').hasClass('active')) {
        // When toggle does not have 'active' class:
        // Nav width  will transition 300px from the 50px of the iconNav.
        // The displayed content (what is held in .rCol) will also adjust with Nav.
        // The arrow rotation of 180 degs is removed and menu style is reset from 'display: block'
        // Note: 'ul.sub-menu' having style display block comes from the natural way jQuery
        // displays and hides conent, at 'display: block', the ul content will never close.
        $('.nav-icon').animate({'margin-left': '10px'}, 500)
        $('nav.nav-side-menu').animate({width: '300px'}, 500, () => {
          $('li strong').show()
          $('.row.footer').show()
          $('#brand-logo').show()
          $('span.arrow').show()
          $('.brand strong').show()
          $('ul.sub-menu').attr('style', '')
        })
        $('#header').animate({width: '-=250px'}, 500, () => {
          $('#header').width('calc(100% - 300px)')
        })
        $('#display').animate({width: '-=250px'}, 500, () => {
          $('#display').width('calc(100% - 300px)')
        })
        $('#footer').animate({width: '-=250px'}, 500, () => {
          $('#footer').width('calc(100% - 300px)')
        })
        // $('.rCol').animate({left: '0'}, 500)
        $('#toggle-wrap').removeClass('fa-rotate-180')
        // $('#avatar').animate({left: '+=125px'}, 500)
      } else {
        // When '#toggle-wrap.active = true':
        // Nav width will transition to 50px, for Icon Nav.
        // Displayed content will adjust to screen real-estate also.
        // arrow is rotated 180 degs and hide all the Second lvl nav
        $('.nav-icon').animate({'margin-left': '-10px'}, 500)
        $('nav.nav-side-menu').animate({width: '50px'}, 500)
        $('#header').animate({width: '+=250px'}, 500, () => {
          $('#header').width('calc(100% - 50px)')
        })
        $('#display').animate({width: '+=250px'}, 'slow', () => {
          $('#display').width('calc(100% - 50px)')
        })
        $('#footer').animate({width: '+=250px'}, 500, () => {
          $('#footer').width('calc(100% - 50px)')
        })
        // $('#avatar').animate({left: '-=125px'}, 450)
        // $('.rCol').animate({left: '-250px'}, 600)
        $('#toggle-wrap').addClass('fa-rotate-180')
        $('ul.sub-menu').hide()
      }
    },
    iconNavClose () {
            // Add event listener on menu items so that items will also toggle icon menu
      if ($('#toggle-wrap').hasClass('active')) {
        // When toggle has 'active' class:
        // Nav width  will transition 300px from the 50px of the iconNav.
        // The displayed content (what is held in .rCol) will also adjust with Nav.
        // The arrow rotation of 180 degs is removed and menu style is reset from 'display: block'
        // Note: 'ul.sub-menu' having style display block comes from the natural way jQuery
        // displays and hides conent, at 'display: block', the ul content will never close.

        $('#toggle-wrap').removeClass('active')
        $('nav.nav-side-menu').animate({width: '300px'}, 500, function () {
          $('li strong').show()
          $('span.arrow').show()
          $('.row.footer').show()
          $('#brand-logo').show()
          // $('.brand strong').show()
          $('ul.sub-menu').attr('style', '')
        })
        $('#header').animate({width: '-=250px'}, 500, () => {
          $('#header').width('calc(100% - 300px)')
        })
        $('#display').animate({width: '-=250px'}, 500, () => {
          $('#display').width('calc(100% - 300px)')
        })
        $('#footer').animate({width: '-=250px'}, 500, () => {
          $('#footer').width('calc(100% - 300px)')
        })
        // $('#avatar').animate({left: '+=125px'}, 500)

        $('#toggle-wrap').removeClass('fa-rotate-180')
      }
    }
  },
  computed: {
    ...mapGetters(['resGroups'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  nav{
    display: block;
  }
  h6{
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }
  a.nav-link.active{
    background: transparent;
  }
  .brand{
    max-height: 50px;
  }
  .brand label{
    font-weight: 100;
  }
  #brand-logo{
    max-height: 50px;
  }
  #toggle-wrap{
    margin: 15px 13px;
  }
  .nav-side-menu li .active{
    background-color: transparent;
    border-left: none;
  }
  .navTitle{
    text-transform: uppercase;
    color: lightgrey;
    padding: 21px 0 0px 11px;
    &:hover{
      border-left-color: transparent;
      background-color: transparent;
    }
    &:first-child{
     padding-top: 25px; 
    }
  }
  .nav-item{
    padding: 5px 0 5px 10px;
  }
  .sub-menu .nav-item{
    padding: 0;
  }
  hr{
    margin: 1px 0 0 0;
  }
  .fa-power-off{
    color: inherit;
  }
</style>
