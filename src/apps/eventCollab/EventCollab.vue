<template>
  <b-container fluid id="display">
    <event-form :title="title" @reqOccurCheck="checkOccur"/>
    <conflict-list :occur="occur"/>
  </b-container>
</template>

<script>
  import eventForm from '@/apps/eventCollab/components/EventForm'
  import conflictList from '@/apps/eventCollab/components/conflictList'
  
  export default {
    name: 'Event-Collab',
    data () {
      return {
        title: 'Event Form',
        occur: []
      }
    },
    components: {
      'event-form': eventForm,
      'conflict-list': conflictList
    },
    methods: {
      checkOccur (ocr) {
        this.occur = ocr
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
