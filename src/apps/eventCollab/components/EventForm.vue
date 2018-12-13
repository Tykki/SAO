<template>
  <div id="main-content">
    <h1>{{title}}</h1>
    
    <b-card border-variant="default" class="shadow-sm">
      <b-form id="eventForm" class="text-left" @submit.prevent="submit" novalidate :validated="submitted">

          <b-alert :show="errAlert" variant="danger"><span v-for="error in errLog.errMsg">{{error}}</span></b-alert>
          

        <b-form-row>
          <b-col sm="12">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="1"
                      label="Event Name:"
                      label-for="eventName"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-input required id="eventName" v-model="formData.eventName" type="text" placeholder="Ex: Taco Tuesday" />
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
              <b-form-select required id="department" v-model="formData.department" :options="departments" />
            <b-form-invalid-feedback>Please Select a Department</b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="6">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="2"
                      label="Audience:"
                      label-for="audience"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-select required id="audience" v-model="formData.audience" :options="audiences" />
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
                <b-form-select required id="category" v-model="formData.category" :options="categories" />
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
                  <b-form-select required id="status" v-model="formData.status" :options="status" />
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
              <b-form-input id="theme" v-model="formData.theme" />
            </b-form-group>
          </b-collapse>
          </b-col>
        </b-row>

        <b-row align-h="between" class="row">
          <b-col cols="7.5" class="text-left">
            <b-link class="pl-3" @click="Ctheme = !Ctheme">{{themeLabel}}</b-link>
            <br>
            <br>
            <form-modal class="pl-3" ref="formModal" @addOccur="showOccur" :locations="locations"></form-modal>
            <br />
            <br />
            <occur-list @deleteReq="deleteOccur" @editReq="editOccur" :locations="locations" :occurrences="formData.occurrences" />
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
import FormModal from '@/apps/eventCollab/components/FormModal'
import OccurList from '@/apps/eventCollab/components/OccurList'

export default {
  name: 'Event-Form',
  props: ['title'],
  data () {
    return {
      errLog: {
        errCount: 0,
        errMsg: []
      },
      locations: [],
      departments: [],
      audiences: [],
      categories: [],
      status: [],
      formData: { occurrences: [] },
      Ctheme: false,
      submitted: false
    }
  },
  components: {
    'form-modal': FormModal,
    'occur-list': OccurList
  },
  created () {
    fetch(`https://websrvcs.sa.uic.edu/api/sao/events/metadata/?token=${this.$parent.$parent.authUser.token}`).then(function (res) {
      return res.json()
    }).then(data => {
      $.each(data, (i, v) => {
        // console.log(i, v)
        if (i === 'audiences') {
          for (let item of v) {
            this.audiences.push({value: item.id, text: item.name})
          }
        }
        if (i === 'categories') {
          for (let item of v) {
            this.categories.push({value: item.id, text: item.name})
          }
        }
        if (i === 'departments') {
          for (let item of v) {
            this.departments.push({value: item.id, text: item.name})
          }
        }
        if (i === 'status') {
          for (let item of v) {
            this.status.push({value: item.id, text: item.name})
          }
        }
        if (i === 'locations') {
          for (let item of v) {
            this.locations.push({value: item.id, text: item.name})
          }
        }
      })
    })
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
    submit () {
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
.card-body{
  /*padding-left: 120px;*/
  /*padding-right: 120px;*/
}

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
