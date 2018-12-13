<template>
  <b-container id="display">
    <h3>Your Session has expired or has become invaild. Please wait as your session is refreshed.</h3>
    <img src="./assets/error-taco.gif" alt="error-taco">
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
    this.handleError()
  },
  methods: {
    handleError () {
      setTimeout(() => { localStorage.removeItem('token'); window.location.href = 'https://websrvcs.sa.uic.edu/api/sao/auth' }, 3000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
