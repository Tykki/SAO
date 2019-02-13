<template>
  <b-container id="" fluid>
     <important-posts title="Important Announcements" :upcoming="authUser.notesPriority" />
    
    <b-row >

        <b-col lg="8">
          <pro-dev title="Professional Development" :data="proDev" />

            <h4>UIC News</h4>
            <b-card v-for="(news, n) of UICnews.display" :key="n" class="shadow-sm" :class="{'shadow-lg': newsFocus === n}" @mouseover="newsFocus = n" @mouseout="newsFocus = null">
                <b-row>
                    <b-col><b-img v-if="news.thumbnail" class="news-thumbnail" :src="news.thumbnail" alt="img" /></b-col>
                    <b-col cols="8">
                        <h5>{{news.title}}</h5>
                        <p class="card-text text-secondary">{{news.description}}</p>
                        <label>Author:</label> <span>{{news.author}}</span>
                        <!-- <b-input size="sm" type="datetime-local" :value="new Date(news.pubDate)" /> -->
                        <b-btn class="float-right" size="sm" variant="outline-secondary" target="_blank" :href="news.link">Read Article</b-btn>
                    </b-col>
                </b-row>
            </b-card>

        </b-col>
        <b-col lg="4">
            <b-card  class="shadow-sm text-center text-prime2">
              <img class="mb-3" id="saTechBanner" src="./../assets/saTechBanner.png" alt="Student Affairs Technology Banner"><br/>
              <b-btn class="mb-3" href="http://saservice.uic.edu" target="_blank" variant="outline-prime2">Service Request</b-btn><br/>
              <icon class="mr-3" id="saTechPhone" icon="phone" /><span class="ml-3 text-dark">(312) 413-5135 </span>
            </b-card>
                
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
export default {
  name: 'Dashboard',
  // props: { authUser: Object, time: function },
  components: { EventView, ImportantPosts, ProDev },
  data () {
    return {
      title: 'Welcome,',
      newsFocus: null,
      mediaIcons: [
        {name: 'facebook-f', text: 'UIC Life on Facebook', color: 'fbBlue', link: 'https://www.facebook.com/UIClife/'},
        {name: 'twitter', text: 'UIC Life on Twitter', color: 'twBlue', link: 'https://twitter.com/uiclife?lang=en'},
        {name: 'youtube-square', text: 'UIC Life on YouTube', color: 'ytRed', link: 'https://www.youtube.com/user/UIClife'}
      ],
      proDev: [],
      UICnews: {}
    }
  },
  created () {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftoday.uic.edu%2Fnews-release%2Fnews-release%2Ffeed').then(res => res.json()).then(res => {
      this.$set(this.UICnews, 'display', res.items.slice(0, 5))
    })
    fetch(`https://websrvcs.sa.uic.edu/api/sao/events/?token=${this.authUser.token}&category=16`).then(res => res.json()).then(res => {
      res.reverse()
      $.each(res, (i, v) => {
        console.log(i, v)
        if (this.proDev.length < 3) {
          this.proDev.push(v)
        }
        // this.$set(this.proDev, `event${[i]}`, v)
      })
    })
    // fetch(`https://websrvcs.sa.uic.edu/api/sao/announcements/?since=2018-08-08&priority=1&token=${this.authUser.token}`).then(res => res.json()).then((data) => { this.$set(this.priorityNotes, 'display', data.slice(0, 4).reverse()); console.log(data) })
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
.news-thumbnail{
    /*max-height: 80px;*/
    max-width: 175px;
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
