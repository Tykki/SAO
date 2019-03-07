<template>
  <div id="">
    <h1>{{title()}}</h1>
    <alerts ref="alerts" />
      <b-form id="eventForm" class="text-left" @submit.prevent="submit" novalidate :validated="submitted">
    <b-card border-variant="default" :class="{ 'shadow-sm': true }">

          <b-alert :show="errAlert" variant="danger"><span v-for="(error, err) in errLog.errMsg" :key="err">{{error}}</span></b-alert>
          <!-- <b-alert :show="ocrErrLog.message" variant="danger"><span>{{ocrErrLog.message}}</span></b-alert> -->
          

        <b-form-row>
          <b-col sm="12">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="1"
                      label="Event Name:"
                      label-for="eventName"> <!-- make breakpoints for better use of horizontal view -->
              <!-- <b-form-input v-if="event" required id="eventName" v-model="event.name" type="text" placeholder="Ex: Taco Tuesday" /> -->
              <b-form-input required id="eventName" v-model="formData.name" type="text" placeholder="Ex: Taco Tuesday" />
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
              <!-- <b-form-select v-if="event" required id="department" v-model="event.departmentID" :options="eventInputs.departments" /> -->
              <b-form-select required id="department" v-model="formData.department" :options="eventInputs.departments" />
            <b-form-invalid-feedback>Please Select a Department</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="6">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="2"
                      label="Audience:"
                      label-for="audience"> <!-- make breakpoints for better use of horizontal view -->
              <!-- <b-form-select v-if="event" required id="audience" v-model="event.audienceID" :options="eventInputs.audiences" /> -->
              <b-form-select required id="audience" v-model="formData.audience" :options="eventInputs.audiences" />
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
          <!-- <b-form-textarea v-if="event" required id="description" v-model="event.description" rows="6" /> -->
          <b-form-textarea required id="description" v-model="formData.description" rows="6" />
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
                <!-- <b-form-select v-if="event" required id="category" v-model="event.categoryID" :options="eventInputs.categories" /> -->
                <b-form-select required id="category" v-model="formData.category" @input="toggleSignUp()" :options="eventInputs.categories" />
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
                  <!-- <b-form-select v-if="event" required id="status" v-model="event.statusID" :options="eventInputs.status" /> -->
                  <b-form-select required id="status" v-model="formData.status" :options="eventInputs.status" />
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
                  label="Tags:"
                  label-for="theme"> <!-- make breakpoints for better use of horizontal view -->
              <!-- <b-form-input v-if="event" id="theme" v-model="event.theme" /> -->
              <b-form-checkbox-group class="pb-3" v-model="formData.selectedOpts" :options="checkOpts"></b-form-checkbox-group>
              <b-form-input id="theme" v-model="formData.theme" />
            </b-form-group>
          </b-collapse>
            <b-link class="" @click="Ctheme = !Ctheme">{{themeLabel}}</b-link>
          </b-col>

          <b-col sm="12" md="6">
          <b-collapse id="signupLink" v-model="pdLink">
            <b-form-group breakpoint="xl" 
                  label-size="sm"
                  label-cols="2"
                  label="Sign Up Link:"
                  label-for="signupLink"> <!-- make breakpoints for better use of horizontal view -->
              <!-- <b-form-input v-if="event" id="signupLink" placeholder="ex: https://uic.edu" v-model="event.signupLink" type="url" :required="pdLink"/> -->
              <b-form-input id="signupLink" placeholder="ex: https://uic.edu" v-model="formData.signupLink" type="url" :required="pdLink"/>
            <b-form-invalid-feedback>Please Provide a Vaild Sign Up Link</b-form-invalid-feedback>
            </b-form-group>
          </b-collapse>
          </b-col>
        </b-row>

        <!-- <b-row>
          <b-col class="pt-3">
            <b-form-group class="pl-2" label="Does Your Event Include?">
              <b-form-checkbox-group v-model="formData.selectedOpts" :options="checkOpts">
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row> -->

        <b-row class="mt-5" align-h="center">
          <b-col cols="12" class="text-center">
            <!-- <occur-list class="mt-3" v-if="event" @deleteReq="deleteOccur" @editReq="editOccur" :locations="eventInputs.locations" :occurrences="event.occurrences" /> -->
            <occur-list @deleteReq="openDelOccurModal" @editReq="editOccur" :locations="eventInputs.locations" :occurrences="formData.occurrences" />
            <form-modal class="mt-3" ref="formModal" @addOccur="showOccur" :locations="eventInputs.locations"></form-modal>
          </b-col>
        </b-row>        

    </b-card>
    <b-row>
          <b-col class="text-right mr-5">
          <b-button type="submit" variant="primary">{{this.event ? "Update" : "Create"}}</b-button>
          </b-col>
        </b-row>
      </b-form>
      <b-modal ref="delOccurModal" size="sm" hide-footer title="Delete This Occurrence?">
      <div class="text-center">
        <h6>Are You Sure?</h6>
      </div>
      <div class="text-center">
        <b-btn class="" variant="outline-info" @click="hideDelOccurModal">Do Not Delete</b-btn>
        <b-btn class="" variant="outline-danger" @click="deleteOccur(id)">Delete Occurrence</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FormModal from '@/apps/eventCollab/components/FormModal'
import OccurList from '@/apps/eventCollab/components/OccurList'
import Alerts from '@/apps/eventCollab/components/Alerts'

export default {
  name: 'Event-Form',
  props: ['ocrErrLog'],
  data () {
    return {
      title: () => this.event ? 'Update Event' : 'Create Event',
      errLog: {
        errCount: 0,
        errMsg: []
      },
      formData: { occurrences: [], selectedOpts: [] },
      Ctheme: true,
      checkOpts: [{text: 'Tableau', value: 'tableau'}, {text: 'Marketing', value: 'marketing'}, {text: 'Ticketing', value: 'ticketing'}],
      pdLink: false,
      submitted: false,
      event: this.$route.params.event,
      toDelete: null
    }
  },
  components: {
    'form-modal': FormModal,
    'occur-list': OccurList,
    Alerts
  },
  mounted () {
    console.log(this)
    if (this.event) {
      this.formData = Object.assign({}, this.event, {audience: this.event.audienceID, category: this.event.categoryID, department: this.event.departmentID, status: this.event.statusID, selectedOpts: []})
      for (let occur of this.formData.occurrences) {
        occur.locName = occur.location
        occur.location = occur.locationID
      }
      this.formData.tableau ? this.formData.selectedOpts.push('tableau') : null
      this.formData.marketing_requested ? this.formData.selectedOpts.push('marketing') : null
      this.formData.ticketed ? this.formData.selectedOpts.push('ticketing') : null
    }
  },
  methods: {
    openDelOccurModal (id) {
      console.log(id)
      this.toDelete = id
      this.$refs.delOccurModal.show(id)
    },
    hideDelOccurModal () {
      this.$refs.delOccurModal.hide()
    },
    eventForm () { return document.getElementById('eventForm') },
    clearForm () {
      this.formData = { occurrences: [], selectedOpts: [] }
      this.event ? this.event = undefined : null
    },
    toggleSignUp () {
      if (this.formData.category === 16) {
        this.pdLink = true
      } else { this.pdLink = false }
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
    create () {
      if ((this.occurValid() === true) && (this.eventForm().checkValidity() === true)) {
        const t = true; const f = false
        let parsedData = {
          audience: this.formData.audience,
          category: this.formData.category,
          department: this.formData.department,
          status: this.formData.status,
          name: this.formData.name,
          description: this.formData.description,
          link: this.formData.link ? this.formData.link : '',
          signupLink: this.formData.signupLink ? this.formData.signupLink : '',
          occurrences: this.formData.occurrences,
          theme: this.Ctheme ? this.formData.theme : '',
          tableau: this.formData.selectedOpts.filter(x => x === 'tableau').length ? t : f,
          marketing: this.formData.selectedOpts.filter(x => x === 'marketing').length ? t : f,
          marketingInfo: '',
          ticketed: this.formData.selectedOpts.filter(x => x === 'ticketing').length ? t : f
        }
        console.log(parsedData)
        // this.$('addReq', parsedData)
        // fetch('/static/testing.json').then(res => res.json()).then(res => console.log(res))
        fetch('https://websrvcs.sa.uic.edu/api/sao/events/', {method: 'post', mode: 'cors', body: JSON.stringify(parsedData), headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}}).then(res => {
          console.log(res)
          this.$refs.alerts.showAlert('created')
        })
        this.submitted = false
        this.clearForm()
        this.$emit('reqClearConflicts')
      }
    },
    update () {
      console.log(this.event)
      if ((this.occurValid() === true) && (this.formData.description !== '') && (this.formData.name !== '')) {
        const t = true; const f = false
        let parsedData = {
          audience: this.formData.audience,
          category: this.formData.category,
          department: this.formData.department,
          status: this.formData.status,
          name: this.formData.name,
          link: this.formData.link ? this.formData.link : '',
          signupLink: this.formData.signupLink ? this.formData.signupLink : '',
          description: this.formData.description,
          occurrences: this.formData.occurrences,
          theme: this.Ctheme ? this.formData.theme : '',
          tableau: this.formData.selectedOpts.filter(x => x === 'tableau').length ? t : f,
          marketing: this.formData.selectedOpts.filter(x => x === 'marketing').length ? t : f,
          marketingInfo: '',
          ticketed: this.formData.selectedOpts.filter(x => x === 'ticketing').length ? t : f
        }
        this.formData = parsedData
        console.log(parsedData)
        // this.$('addReq', parsedData)
        // fetch('/static/testing.json').then(res => res.json()).then(res => console.log(res))
        fetch(`https://websrvcs.sa.uic.edu/api/sao/events/${this.event.id}`, {method: 'put', mode: 'cors', body: JSON.stringify(parsedData), headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}}).then(res => {
          console.log(res)
          this.$refs.alerts.showAlert('updated')
        })
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
    deleteOccur () {
      let id = this.toDelete
      if (this.event) {
        this.event.occurrences.splice(id, 1)
      } else { this.formData.occurrences.splice(id, 1) }
      this.hideDelOccurModal()
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
    occurError () {
      if (this.ocrErrLog) {
        this.errLog.errCount++
        this.errLog.errMsg.push(this.ocrErrLog.message)
      }
    },
    errAlert () {
      if ((this.submitted === false) && this.ocrErrLog) {
        return false
      } else return true
    },
    themeLabel () {
      if (this.Ctheme === true) {
        return '- Remove Tags'
      } else return '+ Add Tags'
    }
  },
  watch: {
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
