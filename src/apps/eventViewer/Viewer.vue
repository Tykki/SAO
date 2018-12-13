<template>
    <b-container id="display" fluid>
    	
      <viewer :time="time" :title="title" />
    </b-container>
</template>

<script>
import View from './components/EventsViewer'
export default {
  name: 'Event-Viewer',
  props: ['time'],
  data () {
    return {
      title: 'Events'
    }
  },
  components: {
    'viewer': View
  }
}
</script>

<style lang="scss" scoped>

</style>
