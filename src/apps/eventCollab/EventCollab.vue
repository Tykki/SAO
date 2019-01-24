<template>
  <b-container fluid id="">
    <event-form @reqOccurCheck="checkOccur" @reqClearConflicts="clearConflicts" />
    <conflict-list :occur="occur"/>
  </b-container>
</template>

<script>
  import eventForm from '@/apps/eventCollab/components/EventForm'
  import conflictList from '@/apps/eventCollab/components/ConflictList'
  
  export default {
    name: 'Event-Collab',
    data () {
      return {
        occur: []
      }
    },
    components: {
      'event-form': eventForm,
      'conflict-list': conflictList
    },
    methods: {
      clearConflicts () {
        this.occur = []
      },
      checkOccur (ocr) {
        this.occur = ocr
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
