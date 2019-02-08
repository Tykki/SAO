<template>
  <b-container fluid id="">
    <event-form @reqOccurCheck="checkOccur" @reqClearConflicts="clearConflicts" :ocrErrLog="occurErrLog" />
    <conflict-list @ocrErr="sendOcrErr" @noErr="clearOcrErr" :occur="occur"/>
  </b-container>
</template>

<script>
  import eventForm from '@/apps/eventCollab/components/EventForm'
  import conflictList from '@/apps/eventCollab/components/ConflictList'
  
  export default {
    name: 'Event-Collab',
    data () {
      return {
        occur: [],
        occurErrLog: {}
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
      },
      sendOcrErr (err) {
        this.occurErrLog = Object.assign(err)
      },
      clearOcrErr () {
        this.occurErrLog = Object.assign({}, {messages: 0})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
