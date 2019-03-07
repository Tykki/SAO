<template>
  <b-container fluid id="">
    <b-row align-h="center">
      <h2 class="text-center">{{post.title ? post.title : title}}</h2>
    </b-row>
    <b-row v-if="!truncate">
      <p class="mb-2 ml-3">{{post.description}}</p>
    </b-row>
    <b-row v-if="truncate">
      <p class="mb-2 ml-3">{{post.description | truncate(200)}}</p>
    </b-row>
    <b-row>
      <b-link v-if="post.link" :href="post.link" target="_blank" class="ml-5 text-prime2"><icon icon="link" /> Click For More</b-link>
    </b-row>
    <b-row class="font-italic" align-h="end">
      <b-col cols="6">
        <p class="mt-2 mb-0"><small>Posted on: {{time(post.created_on).format("lll")}}</small></p>
    
        <p class="mb-0"><small>Posted by: {{post.created_by | capitalize}}</small></p>
      
        <p class=""><small>Intended for: {{post.audience | capitalize}}</small></p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PostView',
  props: { post: Object, truncate: Boolean },
  data () {
    return {
      title: 'PostView'
    }
  },
  computed: {
    // ...mapGetters(['notifications']),
    ...mapState(['time'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
