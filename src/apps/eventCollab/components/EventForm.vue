<template>
  <div id="">
    <h1>{{title()}}</h1>
    
      <b-form id="eventForm" class="text-left" @submit.prevent="submit" novalidate :validated="submitted">
    <b-card border-variant="default" :class="{ 'shadow-sm': true }">

          <b-alert :show="errAlert" variant="danger"><span v-for="(error, err) in errLog.errMsg" :key="err">{{error}}</span></b-alert>
          

        <b-form-row>
          <b-col sm="12">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="1"
                      label="Event Name:"
                      label-for="eventName"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-input v-if="event" required id="eventName" v-model="event.name" type="text" placeholder="Ex: Taco Tuesday" />
              <b-form-input v-else required id="eventName" v-model="formData.eventName" type="text" placeholder="Ex: Taco Tuesday" />
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
              <b-form-select v-if="event" required id="department" v-model="event.departmentID" :options="eventInputs.departments" />
              <b-form-select v-else required id="department" v-model="formData.department" :options="eventInputs.departments" />
            <b-form-invalid-feedback>Please Select a Department</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="6">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="2"
                      label="Audience:"
                      label-for="audience"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-select v-if="event" required id="audience" v-model="event.audienceID" :options="eventInputs.audiences" />
              <b-form-select v-else required id="audience" v-model="formData.audience" :options="eventInputs.audiences" />
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
          <b-form-textarea v-if="event" required id="description" v-model="event.description" rows="6" />
          <b-form-textarea v-else required id="description" v-model="formData.description" rows="6" />
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
                <b-form-select v-if="event" required id="category" v-model="event.categoryID" :options="eventInputs.categories" />
                <b-form-select v-else required id="category" v-model="formData.category" @input="toggleSignUp()" :options="eventInputs.categories" />
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
                  <b-form-select v-if="event" required id="status" v-model="event.statusID" :options="eventInputs.status" />
                  <b-form-select v-else required id="status" v-model="formData.status" :options="eventInputs.status" />
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
              <b-form-input v-if="event" id="theme" v-model="event.theme" />
              <b-form-input v-else id="theme" v-model="formData.theme" />
            </b-form-group>
          </b-collapse>
            <b-link class="" @click="Ctheme = !Ctheme">{{themeLabel}}</b-link>
          </b-col>

          <b-col sm="12" md="6">
          <b-collapse id="signUpLink" v-model="pdLink">
            <b-form-group breakpoint="xl" 
                  label-size="sm"
                  label-cols="2"
                  label="Sign Up Link:"
                  label-for="signUpLink"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-input v-if="event" id="signUpLink" placeholder="ex: https://uic.edu" v-model="event.signUpLink" type="url" :required="pdLink"/>
              <b-form-input v-else id="signUpLink" placeholder="ex: https://uic.edu" v-model="formData.signUpLink" type="url" :required="pdLink"/>
            <b-form-invalid-feedback>Please Provide a Vaild Sign Up Link</b-form-invalid-feedback>
            </b-form-group>
          </b-collapse>
          </b-col>
        </b-row>

        <b-row class="mt-5" align-h="center">
          <b-col cols="12" class="text-center">
            <occur-list class="mt-3" v-if="event" @deleteReq="deleteOccur" @editReq="editOccur" :locations="eventInputs.locations" :occurrences="event.occurrences" />
            <occur-list v-else @deleteReq="deleteOccur" @editReq="editOccur" :locations="eventInputs.locations" :occurrences="formData.occurrences" />
            <form-modal class="mt-3" ref="formModal" @addOccur="showOccur" :locations="eventInputs.locations"></form-modal>
          </b-col>
        </b-row>
        <b-row>
          <b-col>

          </b-col>
        </b-row>

        

    </b-card>
    <b-row>
          <b-col class="text-right mr-5">
          <b-button type="submit" variant="primary">{{this.event ? "Update" : "Create"}}</b-button>
          </b-col>
        </b-row>
      </b-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FormModal from '@/apps/eventCollab/components/FormModal'
import OccurList from '@/apps/eventCollab/components/OccurList'

export default {
  name: 'Event-Form',
  data () {
    return {
      title: () => this.event ? 'Update Event' : 'Create Event',
      errLog: {
        errCount: 0,
        errMsg: []
      },
      formData: { occurrences: [] },
      Ctheme: true,
      pdLink: false,
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
    clearForm () {
      this.formData = { occurrences: [] }
      this.event ? this.event = undefined : null
    },
    isEven (n) {
      if (n % 2 === 0) {
        return true
      } else return false
    },
    toggleSignUp () {
      if (this.event) {
        if (this.event.categoryID === 16) {
          this.pdLink = true
        } else { this.pdLink = false }
      } else if (this.formData.category === 16) {
        this.pdLink = true
      } else { this.pdLink = false }
    },
    occurValid () {
      this.errLog = {
        errCount: 0,
        errMsg: []
      }
      if (this.event) {
        if (this.event.occurrences.length === 0) {
          this.errLog.errMsg.push('Please Add at least 1 Occurrence.')
          this.errLog.errCount ++
        }
      } else if (this.formData.occurrences.length === 0) {
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
    create () {
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
        fetch('https://websrvcs.sa.uic.edu/api/sao/events/', {method: 'post', mode: 'cors', body: JSON.stringify(parsedData), headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}}).then(res => console.log(res))
        this.submitted = false
        this.clearForm()
        this.$emit('reqClearConflicts')
      }
    },
    update () {
      console.log(this.event)
      if ((this.occurValid() === true) && (this.event.description !== '') && (this.event.name !== '')) {
        let parsedData = {
          audience: this.event.audienceID,
          category: this.event.categoryID,
          department: this.event.departmentID,
          status: this.event.statusID,
          name: this.event.name,
          description: this.event.description,
          occurrences: this.event.occurrences,
          theme: this.Ctheme ? this.event.theme : '',
          tableau: true,
          marketing: true,
          marketingInfo: '',
          ticketed: this.isEven(this.event.occurrences[0].location)
        }
        this.formData = parsedData
        console.log(parsedData)
        // this.$('addReq', parsedData)
        // fetch('/static/testing.json').then(res => res.json()).then(res => console.log(res))
        fetch(`https://websrvcs.sa.uic.edu/api/sao/events/${this.event.id}`, {method: 'put', mode: 'cors', body: JSON.stringify(parsedData), headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}}).then(res => console.log(res))
        this.submitted = false
        this.clearForm()
        this.$emit('reqClearConflicts')
      }
    },
    submit () {
      this.submitted = true
      console.log(this.occurValid(), this.eventForm().checkValidity())
      if (this.event) {
        this.update()
      } else { this.create() }
    },
    showOccur (ocr) {
      if (this.event) {
        if (ocr.update) {
          this.$set(this.event.occurrences, ocr.upId, ocr)
          // [ocr.id] = ocr
        } else { this.event.occurrences.push(ocr) }
      } else if (ocr.update) {
        this.$set(this.formData.occurrences, ocr.upId, ocr)
        // [ocr.id] = ocr
      } else { this.formData.occurrences.push(ocr) }
      if (this.event) {
        this.$emit('reqOccurCheck', this.event.occurrences)
      } else { this.$emit('reqOccurCheck', this.formData.occurrences) }
    },
    deleteOccur (id) {
      if (this.event) {
        this.event.occurrences.splice(id, 1)
      } else { this.formData.occurrences.splice(id, 1) }
    },
    editOccur (id, occur) {
      // console.log(id, occur)
      // console.log(this.formData.occurrences[id])
      if (this.event) {
        occur.strt = this.time(occur.startDate).format('YYYY-MM-DDThh:mm')
        occur.fin = this.time(occur.endDate).format('YYYY-MM-DDThh:mm')
      }
      console.log(occur)
      this.$refs.formModal.editOccur(id, occur)
      // this.formData.occurrences.find(x => x.id === id)
    }
  },
  computed: {
    ...mapState(['time']),
    ...mapGetters(['eventInputs', 'token']),
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
  },
  watch: {
    pdLink () {
      console.log(this.pdLink)
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
