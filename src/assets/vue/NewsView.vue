<template>
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
</template>

<script>
// Import this component
  // Import date picker css
export default {
  name: 'News-View',
  props: {news: Object},
  data () {
    return {
      newsFocus: null,
      UICnews: {},
      postArticles: []
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.news-thumbnail{
    /*max-height: 80px;*/
    max-width: 175px;
}
</style>
