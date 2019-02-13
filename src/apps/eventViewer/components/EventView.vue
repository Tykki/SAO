<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
        <h2 v-if="!proDev" align="left">{{event.name}}</h2>
        <h5 align="left" class="mt-3">{{event.description}}</h5>
        </b-col>
        <b-col v-if="!proDev" class="" cols="0">
          <b-btn variant="outline-secondary"><icon :icon="['far', 'edit']" @click="openEditModal()" /></b-btn>
        </b-col>
      </b-row>
    </b-container>
    
    <hr/>
    <b-badge :variant="event.status === 'Confirmed' ? 'success' : 'danger'">
      {{event.status}}
    </b-badge>
    


    <span v-if="event.theme"><br/>theme: {{event.theme}}</span>
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
          <span v-if="event.address">address: {{occur.address}}<br/></span>
          starts: {{new Date(occur.startDate).toLocaleString()}}<br/>
          ends: {{new Date(occur.endDate).toLocaleString()}}<br/>
          last updated: {{new Date(occur.updated_on).toLocaleString()}}
          <span v-if="event.note"><br/>info: {{occur.note}}</span>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <b-modal ref="editModal" size="sm" hide-footer title="Edit This Event?">
      <div class="text-center">
        <h6>Are You Sure?</h6>
      </div>
      <div class="text-center">
        <b-btn class="" variant="outline-info" @click="editEvent(event)">Update Event</b-btn>
        <b-btn class="" variant="outline-danger" @click="deleteEvent(event.id)">Delete Event</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
// import EditModal from './helpers/EditModal'
import { mapGetters } from 'vuex'
export default {
  name: 'EventView',
  data () {
    return {
      msg: 'events viewer'
    }
  },
  props: {
    event: Object,
    proDev: Boolean
  },
  computed: {
    ...mapGetters(['eventInputs', 'token'])
  },
  components: {
    // 'edit-btn': EditModal
  },
  mounted () {
  },
  methods: {
    editEvent (event) {
      this.$router.push({name: 'Event Form', params: {event}})
    },
    deleteEvent (id) {
      fetch(`https://websrvcs.sa.uic.edu/api/sao/events/${id}`, {method: 'delete', mode: 'cors', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}}).then(res => console.log(res))
      this.$refs.editModal.hide()
      // this.$router.go()
      // this.$forceUpdate()
      // window.location.reload(true)
    },
    openEditModal () {
      this.$refs.editModal.show()
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


