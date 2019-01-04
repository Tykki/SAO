<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
        <h2 align="left">{{event.name}}</h2>
        <h5 align="left">{{event.description}}</h5>
        </b-col>
        <b-col class="" cols="0">
          <b-btn variant="outline-secondary"><icon :icon="['far', 'edit']" @click="editEvent(event)" /></b-btn>
        </b-col>
      </b-row>
    </b-container>
    
    <hr/>
    <b-badge v-if="event.status==='confirmed'" variant="success">
      Confirmed
    </b-badge>
    <b-badge v-else variant="danger">
      {{event.statusText}}
    </b-badge>


    <br/> theme: {{event.theme}}
    <br/> status: {{event.statusText}}
    <br/> category: {{event.categoryText}}
    <br/> audience: {{event.audienceText}}
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
import EditModal from './helpers/EditModal'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['eventInputs'])
  },
  components: {
    'edit-btn': EditModal
  },
  mounted () {
    this.numToNam()
  },
  methods: {
    numToNam () {
      this.eventInputs.audiences.filter(inp => {
        if (this.event.audience === inp.value) {
          this.$set(this.event, 'audienceText', inp.text)
        }
      })
      this.eventInputs.categories.filter(inp => {
        if (this.event.category === inp.value) {
          this.$set(this.event, 'categoryText', inp.text)
        }
      })
      this.eventInputs.departments.filter(inp => {
        if (this.event.department === inp.value) {
          this.$set(this.event, 'departmentText', inp.text)
        }
      })
      this.eventInputs.status.filter(inp => {
        if (this.event.status === inp.value) {
          this.$set(this.event, 'statusText', inp.text)
        }
      })
    },
    editEvent (event) {
      this.$router.push({name: 'Event Form', params: {event}})
    },
    reqUpdate () {
      this.$emit('reqUpdate', this.event)
    }
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


