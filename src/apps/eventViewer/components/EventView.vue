<template>
  <div>
    <h2 align="left">{{event.name}}</h2>
    <h5 align="left">{{event.description}}</h5>
    
    <hr/>
    <b-badge v-if="event.status==='confirmed'" variant="success">
      Confirmed
    </b-badge>
    <b-badge v-else variant="danger">
      {{event.status}}
    </b-badge>


    <br/> theme: {{event.theme}}
    <br/> status: {{event.status}}
    <br/> category: {{event.category}}
    <br/> audience: {{event.audience}}
    <br/> created by: {{event.created_by}}
    <br/> created on: {{new Date(event.created_on).toLocaleDateString()}} {{new Date(event.created_on).toLocaleTimeString()}}
    <hr/>
    <b-card no-body v-if="event.occurrences && event.occurrences.length > 0">
      <b-tabs pills card>
        <b-tab v-for="(occur, index) in this.event.occurrences" v-bind:key="index" :title="new Date(occur.startDate).toLocaleDateString()">
          <div>
          building: {{occur.location}}<br/>
          address: {{occur.address}}<br/>
          starts: {{new Date(occur.startDate).toLocaleString()}}<br/>
          ends: {{new Date(occur.endDate).toLocaleString()}}<br/>
          last updated: {{new Date(occur.updated_on).toLocaleString()}}<br/>
          info: {{occur.note}}
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <!-- raw: <p>{{JSON.stringify(event)}}</p> -->
  </div>
</template>

<script>
export default {
  name: 'EventView',
  data () {
    return {
      msg: 'events viewer'
    }
  },
  props: {
    event: Object
  },
  mounted () {
    // this.title = "Default Title"
  }
}
</script>

<style lang="scss" scoped>
div{
    text-align: left
}

.compress-enter-active{
  transition: all 0.2s ease;
}

.compress-leave-active{
  transition: all 0.2s ease
}

.compress-leave-to{
  transform: translateX(25px);
  opacity: 0;
}
.compress-enter{
  transform: translateX(-25px);
  opacity: 0;
}
</style>


