<template>
  <b-container id="" fluid>
    <h1>{{title}}</h1>

    <b-row >
        <b-col v-for="(note, i) of notifications" :key="i" cols="12" sm="12" md="6" lg="4">
          <b-card class="shadow-sm" title-tag="h3" @mouseover="hoverFocus = i" @mouseout="hoverFocus = null" :class="{'shadow-lg': hoverFocus === i}" @click="showModal(i)">
            <post-view :post="note" :truncate="true" />
          </b-card>
          <b-modal ok-only ok-title="Close" :ref="`postModal${i}`">
            <post-view :post="note" />
          </b-modal>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PostView from '@/assets/vue/PostView'
export default {
  name: 'Notifications',
  components: { PostView },
  data () {
    return {
      hoverFocus: null,
      title: 'Notifications'
    }
  },
  methods: {
    showModal (i) {
      this.$refs[`postModal${i}`][0].show()
    }
  },
  computed: {
    ...mapGetters(['notifications']),
    ...mapState(['time'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
