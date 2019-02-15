<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
        <h2 v-if="!proDev" align="left">{{event.name}}</h2>
        <hr v-if="proDev" />
        <h5 align="left" class="mt-3">{{event.description}}</h5>
        </b-col>
        <b-col v-if="(email === event.created_by) & (!proDev)" class="" cols="0">
          <b-btn variant="outline-secondary" @click="editEvent(event)"><icon :icon="['far', 'edit']" /></b-btn>
          <b-btn variant="outline-secondary" @click="openDelModal()"><icon :icon="['far', 'trash-alt']" /></b-btn>
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
    <b-modal ref="editModal" size="sm" hide-footer title="Delete This Event?">
      <div class="text-center">
        <b-btn class="pl-3 pr-3" variant="outline-info" @click="closeDelModal">No</b-btn>
        <b-btn class="pl-3 pr-3" variant="outline-danger" @click="deleteEvent(event.id)">Yes</b-btn>
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
    ...mapGetters(['eventInputs', 'token', 'email'])
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
      this.$router.go()
      // this.$forceUpdate()
      // window.location.reload(true)
    },
    openDelModal () {
      this.$refs.editModal.show()
    },
    closeDelModal () {
      this.$refs.editModal.hide()
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


