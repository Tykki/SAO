<template>
  <div>
    <h4>{{title ? title : 'Article Cards'}}</h4>
    
            <b-card v-for="(news, n) of UICnews.display" :key="n" class="shadow-sm" :class="{'shadow-lg': newsFocus === n}" @mouseover="newsFocus = n" @mouseout="newsFocus = null">
                <news-view :news="news" />
            </b-card>
    
  </div>
</template>

<script>
import NewsView from '@/assets/vue/NewsView'
export default {
  props: {title: String, articles: Boolean, news: Boolean},
  components: {NewsView},
  data () {
    return {
      newsFocus: null,
      UICnews: {},
      postArticles: []
    }
  },
  methods: {
    initCards () {
      if (this.news === true) {
        this.getNews()
      } else if (this.articles === true) {
        return
      }
    },
    getNews () {
      fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftoday.uic.edu%2Fnews-release%2Fnews-release%2Ffeed').then(res => res.json()).then(res => {
        this.$set(this.UICnews, 'display', res.items.slice(0, 5))
      })
    },
    articleCards () {
      // function to handle Article Posts
    }
  },
  created () {
    this.initCards()
  }
}
</script>