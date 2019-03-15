<template>
  <b-container fluid>
    <news-view />
    
  </b-container>
</template>

<script>
import NewsView from '@/assets/vue/AccordionCard'
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
    newsCards () {
      fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftoday.uic.edu%2Fnews-release%2Fnews-release%2Ffeed').then(res => res.json()).then(res => {
        this.$set(this.UICnews, 'display', res.items.slice(0, 5))
      })
    },
    articleCards () {
      // function to handle Article Posts
    }
  },
  created () {
    this.newsCards()
  }
}
</script>