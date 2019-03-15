<template>
  <b-container fluid>
    <important-posts title="Important Announcements" :upcoming="authUser.notesPriority" />
    
    <b-row >

        <b-col lg="8">

          <pro-dev title="Professional Development" proDev />

          <uic-news title="UIC News" news />

        </b-col>

        <b-col lg="4">
          
            <b-card  class="shadow-sm text-center text-prime2">
              <img class="mb-3" id="saTechBanner" src="./../assets/saTechBanner.png" alt="Student Affairs Technology Banner"><br/>
              <b-btn class="mb-3" href="http://saservice.uic.edu" target="_blank" variant="outline-prime2">Service Request</b-btn><br/>
              <icon class="mr-3" id="saTechPhone" icon="phone" /><span class="ml-3 text-dark">(312) 413-5135 </span>
            </b-card>
                
            <section class="" id="media-icons">
              <b-row v-for="(icon, i) in mediaIcons" :key="i">
                <b-col cols="12">
                  <b-btn :variant="icon.color" class="media-icon-width" target="_blank" :href="icon.link">
                    <icon :icon="['fab', `${icon.name}`]" class="float-left mt-1"/> <span class="">{{icon.text}}</span>
                  </b-btn>
                </b-col>
              </b-row>
            </section>

        </b-col>

    </b-row>

    
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import EventView from '@/apps/eventViewer/components/EventView'
import ImportantPosts from '@/assets/vue/UpcomingModal'
import ProDev from '@/assets/vue/AccordionCard'
import UicNews from '@/assets/vue/ArticleCards'
export default {
  name: 'Dashboard',
  components: { EventView, ImportantPosts, ProDev, UicNews },
  data () {
    return {
      title: 'Welcome,',
      mediaIcons: [
        {name: 'facebook-f', text: 'UIC Life on Facebook', color: 'fbBlue', link: 'https://www.facebook.com/UIClife/'},
        {name: 'twitter', text: 'UIC Life on Twitter', color: 'twBlue', link: 'https://twitter.com/uiclife?lang=en'},
        {name: 'youtube-square', text: 'UIC Life on YouTube', color: 'ytRed', link: 'https://www.youtube.com/user/UIClife'}
      ]
    }
  },
  created () {
  },
  computed: {
    ...mapState(['authUser', 'time'])
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.media-icon-width{
  width: inherit;
  margin-bottom: 12px;
}
#saTechBanner{
  max-width: 250px;
}
@media screen and (min-width: 992px) and (max-width: 1269px) {
  #saTechBanner{
    max-width: 180px !important;
  }
}
</style>
