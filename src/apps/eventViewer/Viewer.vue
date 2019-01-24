<template>
    <b-container id="" fluid>
    	
      <viewer :title="title" />
    </b-container>
</template>

<script>
import View from './components/EventsViewer'
export default {
  name: 'Event-Viewer',
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
