<template>
  <b-container class="text-center" id="">
    <h3 class="mt-2">Your Session has expired or has become invaild. Please click the button below to have your session refreshed.</h3>
    <b-btn class="mt-3" @click="handleError">Refresh Session</b-btn>
</b-container>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  mounted () {
    // this.handleError()
  },
  methods: {
    handleError () {
      localStorage.removeItem('token'); window.location.href = 'https://websrvcs.sa.uic.edu/api/sao/auth'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
