<template role="navagation">
  <b-nav tag="nav" id="sideNav" class="nav-side-menu shadow" vertical>
    
    <div class="brand">
        <section id="toggle-wrap" @click="iconNavShow" class="faa-parent animated-hover">
          <icon icon="angle-double-left" size="lg" class="faa-passing-reverse faa-fast" />
        </section>
        <section>
            <img id="brand-logo" src="./../assets/sa_small.png" alt="UIC Student Affairs w/ Circle Logo">
                <!-- <br>
                <strong>Department: </strong><label id="dName">N/A</label> -->
        </section>
    </div>
    
    <icon icon="bars" size="2x" class="toggle-btn" data-toggle="collapse" data-target="#menu-content" />
    <div class="menu-list">
        <ul id="menu-content" @click="iconNavClose" class="menu-content collapse out">
            <b-nav-item  class="navTitle">
                <small>
                  <strong>Navagations</strong>
                </small>
            </b-nav-item>

            <b-nav-item to="/dashboard" @click="setNav('a', null)" :class="{active: navSet.active === `a`}" class="blink">
                <icon icon="tachometer-alt" size="lg" class="nav-icon" /><strong>Dashboard</strong>
            </b-nav-item>
            
            <div v-for="(group, i) of resources" :key="`g${i}`">
              <b-nav-item @click="setNav(null, null)" :class="{active: navSet.parent === `${i}`}" :id="`rG${i}`" data-toggle="collapse" :data-target="`#gR${i}`" class="collapsed">
                  <icon :icon="group.icon" size="lg" class="nav-icon" /><strong :id="`rName${i}`">{{group.name}}<icon icon="angle-down" size="lg" class="arrow-down" /></strong>
              </b-nav-item>

              <ul class="sub-menu collapse" :ref="`test${i}`" :id="`gR${i}`">
                  <b-nav-item @click="setNav(`${i}-${r}`, `${i}`)" v-for="(resource, r) of group.resources" :key="r" class="" :class="{active: navSet.active === `${i}-${r}`}"><b-link :to="`/resource${i}-${r}`"><icon icon="angle-right" style="font-weight: 900;" transform="right-12" /><strong :id="`rLink${i}`" style="margin-left: 15px;">{{resource.name}}</strong></b-link></b-nav-item>
              </ul>
            </div>

            
            <hr/>
            <b-nav-item  class="navTitle">
                <small>
                  <strong>Apps</strong>
                </small>
            </b-nav-item>

            <b-nav-item to="/viewer" @click="setNav('b', null)" :class="{active: navSet.active === `b`}" class="blink">
              <icon icon="rocket" size="lg" class="nav-icon" /><strong>Events Viewer</strong>
            </b-nav-item>
            
            <hr/>
            
            <b-nav-item to="/Logout" @click="setNav('c', null), logoutReq()" :class="{active: navSet.active === `c`}" class="blink">
                    <icon icon="power-off" size="lg" class="nav-icon" /><strong>Logout</strong>
            </b-nav-item>
        </ul>
    </div>
    <!-- <b-row class="footer">
      <b-col class="align-items-end">© 2018 The Board of Trustees of the University of Illinois | <a href="https://www.vpaa.uillinois.edu/resources/web_privacy">Privacy Statement</a></b-col>
    </b-row> -->
  </b-nav>
</template>

<script>
export default {
  name: 'sideNav',
  props: ['resources'],
  data () {
    return {
      navSet: {active: 'a', parent: null}
    }
  },
  created () {
  },
  methods: {
    logoutReq () {
      this.$emit('logout')
    },
    setNav (data, i) {
      // console.log(data, i, this)
      if (i === null) {
        let subM = $('.sub-menu')
        subM.collapse('hide')
      }
      if (data === null) {
        return
      }
      this.navSet.active = data
      this.navSet.parent = i
      if (typeof data === 'string') {
        if (data.match(/^[A-Za-z]+$/)) {
          let ix = data.charCodeAt() - 97
          this.$children[ix].$el.click()
        }
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
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
