<template>
  <div id="main-content">
    <h1>{{title()}}</h1>
    
    <b-card border-variant="default" :class="{ 'shadow-sm': true }">
      <b-form id="eventForm" class="text-left" @submit.prevent="submit" novalidate :validated="submitted">

          <b-alert :show="errAlert" variant="danger"><span v-for="(error, err) in errLog.errMsg" :key="err">{{error}}</span></b-alert>
          

        <b-form-row>
          <b-col sm="12">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="1"
                      label="Event Name:"
                      label-for="eventName"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-input v-if="!event" required id="eventName" v-model="formData.eventName" type="text" placeholder="Ex: Taco Tuesday" />
              <b-form-input v-if="event" required id="eventName" v-model="event.name" type="text" placeholder="Ex: Taco Tuesday" />
            <b-form-invalid-feedback>Please Enter an Event Name</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        

        <b-form-row>
          <b-col sm="12" md="6">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="2"
                      label="Department:"
                      label-for="department"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-select v-if="!event" required id="department" v-model="formData.department" :options="eventInputs.departments" />
              <b-form-select v-if="event" required id="department" v-model="event.department" :options="eventInputs.departments" />
            <b-form-invalid-feedback>Please Select a Department</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="6">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="2"
                      label="Audience:"
                      label-for="audience"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-select v-if="!event" required id="audience" v-model="formData.audience" :options="eventInputs.audiences" />
              <b-form-select v-if="event" required id="audience" v-model="event.audience" :options="eventInputs.audiences" />
            <b-form-invalid-feedback>Please Select an Audience</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>


        
        <b-form-row >
          <b-col sm="12" md="6">
        <b-form-group breakpoint="xl" 
                  label-size="sm"
                  label-cols="2"
                  label="Description:"
                  label-for="description"> <!-- make breakpoints for better use of horizontal view -->
          <b-form-textarea v-if="!event" required id="description" v-model="formData.description" rows="6" />
          <b-form-textarea v-if="event" required id="description" v-model="event.description" rows="6" />
            <b-form-invalid-feedback>Please Enter a Description</b-form-invalid-feedback>
        </b-form-group>
            
          </b-col>
          <b-col sm="12" md="6">
          <b-form-row>
            <b-col>
              <b-form-group
                        label-size="sm"
                        class="labelAdj"
                        label="Category:"
                        label-for="category">
                <b-form-select v-if="!event" required id="category" v-model="formData.category" :options="eventInputs.categories" />
                <b-form-select v-if="event" required id="category" v-model="event.category" :options="eventInputs.categories" />
            <b-form-invalid-feedback>Please Select a Category</b-form-invalid-feedback>
              </b-form-group>
              
            </b-col>
              
          </b-form-row>

            <b-form-row>
              <b-col>
                <b-form-group
                          label-size="sm"
                          class="labelAdj"
                          label="Status:"
                          label-for="status">
                  <b-form-select v-if="!event" required id="status" v-model="formData.status" :options="eventInputs.status" />
                  <b-form-select v-if="event" required id="status" v-model="event.status" :options="eventInputs.status" />
            <b-form-invalid-feedback>Please Select a Statue</b-form-invalid-feedback>
                </b-form-group>
              </b-col>          
            </b-form-row>
          </b-col>
        </b-form-row>

        <b-row>
          <b-col sm="12" md="6">
          <b-collapse id="Ctheme" v-model="Ctheme">
            <b-form-group breakpoint="xl" 
                  label-size="sm"
                  label-cols="2"
                  label="Theme:"
                  label-for="theme"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-input v-if="!event" id="theme" v-model="formData.theme" />
              <b-form-input v-if="event" id="theme" v-model="event.theme" />
            </b-form-group>
          </b-collapse>
          </b-col>
        </b-row>

        <b-row align-h="between" class="row">
          <b-col cols="7.5" class="text-left">
            <b-link class="pl-3" @click="Ctheme = !Ctheme">{{themeLabel}}</b-link>
            <br>
            <br>
            <form-modal :event="event" class="pl-3" ref="formModal" @addOccur="showOccur" :locations="eventInputs.locations"></form-modal>
            <br />
            <br />
            <occur-list :event="event" @deleteReq="deleteOccur" @editReq="editOccur" :locations="eventInputs.locations" :occurrences="formData.occurrences" />
            <!-- <br/> -->
          </b-col>
        <b-col class="text-right">
            <br />
            <br />
            <br />
          <b-button type="submit" variant="success">Submit</b-button><br/><br/>
        </b-col>
        </b-row>

        

      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormModal from '@/apps/eventCollab/components/FormModal'
import OccurList from '@/apps/eventCollab/components/OccurList'

export default {
  name: 'Event-Form',
  data () {
    return {
      title: () => this.event ? 'Update Form' : 'Create Form',
      errLog: {
        errCount: 0,
        errMsg: []
      },
      formData: { occurrences: [] },
      Ctheme: true,
      submitted: false,
      event: this.$route.params.event
    }
  },
  components: {
    'form-modal': FormModal,
    'occur-list': OccurList
  },
  created () {
  },
  methods: {
    eventForm () { return document.getElementById('eventForm') },
    isEven (n) {
      if (n % 2 === 0) {
        return true
      } else return false
    },
    occurValid () {
      this.errLog = {
        errCount: 0,
        errMsg: []
      }
      if (this.formData.occurrences.length === 0) {
        this.errLog.errMsg.push('Please Add at least 1 Occurrence.')
        this.errLog.errCount ++
      }
      if (this.errLog.errCount > 0) {
        return false
      }
      if (this.errLog.errCount === 0) {
        return true
      }
    },
    update () {
      console.log(this, this.event)
    },
    submit () {
      if (this.event) {
        return this.update()
      }
      this.submitted = true
      console.log(this.occurValid(), this.eventForm().checkValidity())
      if ((this.occurValid() === true) && (this.eventForm().checkValidity() === true)) {
        let parsedData = {
          audience: this.formData.audience,
          category: this.formData.category,
          department: this.formData.department,
          status: this.formData.status,
          name: this.formData.eventName,
          description: this.formData.description,
          occurrences: this.formData.occurrences,
          theme: this.Ctheme ? this.formData.theme : '',
          tableau: true,
          marketing: true,
          marketingInfo: '',
          ticketed: this.isEven(this.formData.occurrences[0].location)
        }
        console.log(parsedData)
        // this.$('addReq', parsedData)
        // fetch('/static/testing.json').then(res => res.json()).then(res => console.log(res))
        fetch('https://websrvcs.sa.uic.edu/api/sao/events/', {method: 'post', mode: 'cors', body: JSON.stringify(parsedData), headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => console.log(res))
        this.submitted = false
        this.formData = { occurrences: [] }
      }
    },
    showOccur (ocr) {
      this.formData.occurrences = ocr
      this.$emit('reqOccurCheck', this.formData.occurrences)
    },
    deleteOccur (id) {
      this.formData.occurrences.splice(id, 1)
    },
    editOccur (id, occur) {
      // console.log(id, occur)
      // console.log(this.formData.occurrences[id])
      this.$refs.formModal.editOccur(id, occur)
      // this.formData.occurrences.find(x => x.id === id)
    }
  },
  computed: {
    ...mapGetters(['eventInputs']),
    errAlert () {
      if ((this.submitted === false)) {
        return false
      } else return true
    },
    themeLabel () {
      if (this.Ctheme === true) {
        return '- Remove Theme'
      } else return '+ Add Theme'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.labelAdj{
  padding: 5px;
  padding-top: 0px;
}
/* .card-body{ */
  /*padding-left: 120px;*/
  /*padding-right: 120px;*/
/* } */

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
