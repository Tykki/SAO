<template>
  <div>
    <b-alert :show="dismissCountDown"
             fade
             variant="success"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      {{msg.created}}
    </b-alert>
    <b-btn @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: {
        created: 'Your Event has been Created!',
        updated: 'Your Event has been Updated!',
        conflict: 'Your Event has been Created, Other Events are also on this Date.'
      },
      dismissSecs: 2,
      dismissCountDown: 0
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>