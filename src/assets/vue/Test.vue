<template>
  <div>
    <sample />
    <b-alert :show="dismissCountDownC"
             fade
             variant="success"
             @dismissed="dismissCountDownC=0"
             @dismiss-count-down="countDownChanged">
      {{msg.created}}
    </b-alert>
    <b-alert :show="dismissCountDownU"
             fade
             variant="success"
             @dismissed="dismissCountDownU=0"
             @dismiss-count-down="countDownChanged">
      {{msg.updated}}
    </b-alert>
    <b-alert :show="dismissCountDownE"
             fade
             variant="danger"
             @dismissed="dismissCountDownE=0"
             @dismiss-count-down="countDownChanged">
      {{msg.error}}
    </b-alert>
    <b-alert :show="dismissCountDownW"
             fade
             variant="warning"
             @dismissed="dismissCountDownW=0"
             @dismiss-count-down="countDownChanged">
      {{msg.conflict}}
    </b-alert>
    <b-btn @click="showAlert('warning')" variant="info" class="m-1">
      Show alert with count-down timer
    </b-btn>
  </div>
</template>

<script>
import sample from '@/assets/vue/AccordionCard'
export default {
  components: {sample},
  data () {
    return {
      msg: {
        created: 'Your Event has been Created!',
        updated: 'Your Event has been Updated!',
        error: 'Sorry, something went wrong. Your Event wasnt Created.',
        conflict: 'Your Event has been Created, Other Events are also on this Date.'
      },
      dismissSecs: 2,
      dismissCountDownC: 0,
      dismissCountDownU: 0,
      dismissCountDownE: 0,
      dismissCountDownW: 0
    }
  },
  methods: {
    countDownChangedC (dismissCountDownC) {
      this.dismissCountDownC = dismissCountDownC
    },
    countDownChangedU (dismissCountDownU) {
      this.dismissCountDownU = dismissCountDownU
    },
    countDownChangedE (dismissCountDownE) {
      this.dismissCountDownE = dismissCountDownE
    },
    countDownChangedW (dismissCountDownW) {
      this.dismissCountDownW = dismissCountDownW
    },
    showAlert (data) {
      if (data === 'created') {
        this.dismissCountDownC = this.dismissSecs
      }
      if (data === 'updated') {
        this.dismissCountDownU = this.dismissSecs
      }
      if (data === 'warning') {
        this.dismissCountDownW = this.dismissSecs
      }
      if (data === 'error') {
        this.dismissCountDownE = this.dismissSecs
      }
      // this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>