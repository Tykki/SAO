<template>
  <b-container id="" fluid>
    <h1>{{title}}</h1>

    <b-row >
        <b-col v-for="(note, i) of notifications" :key="i" cols="12" sm="6">
            <b-card class="shadow-sm" :title="note.title" title-tag="h3" @mouseover="hoverFocus = i" @mouseout="hoverFocus = null" :class="{'shadow-lg': hoverFocus === i}">
                    <p class="card-text">{{note.description}}</p>
                    <p class="card-text">{{time(note.created_on).format("lll")}}</p>
            </b-card>
        </b-col>
        <!-- <b-col cols="12" sm="6">
            <b-card title="Card Title" title-tag="h3">
                <p class="card-text">
                    <p class="card-text"> {{group}}</p>
                </p>
            </b-card>
        </b-col> -->
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Notifications',
  // props: { authUser: Object },
  data () {
    return {
      hoverFocus: null,
      title: 'Notifications'
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
