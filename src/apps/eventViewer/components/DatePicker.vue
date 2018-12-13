<template>
  <b-form-input />
</template>
<script>

export default {
  name: 'DatePicker',
  data () {
    return {
    }
  },
  mounted () {
    $(this.$el).datepicker({
      onSelect: date => this.$emit('input', date)
    })
  },
  beforeDestroy () {
    $(this.$el).datepicker('hide').datepicker('destroy')
  },
  methods: {
    updateDate (date) {
      this.date = date
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
