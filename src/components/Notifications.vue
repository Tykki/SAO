<template>
  <b-container id="display" fluid>
    <div id="main-content">
    <h1>{{title}}</h1>

    <b-row >
        <b-col v-for="(note, i) of authUser.notifications" :key="i" cols="12" sm="6">
            <b-card class="shadow-sm" :title="note.title" title-tag="h3">
                    <p class="card-text">{{note.description}}</p>
                    <p class="card-text">{{new Date(note.created_on).toLocaleDateString()}} {{new Date(note.created_on).toLocaleTimeString()}}</p>
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
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Notifications',
  props: { authUser: Object },
  data () {
    return {
      title: 'Notifications'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
