<template>
  <b-container id="display" fluid>
    <div id="main-content">
      
    
    <h1>{{title}}</h1>

    <b-card border-variant="default" class="shadow-sm">
      <b-form id="noteForm" @submit.prevent="createNote" novalidate :validated="submitted">

        <!-- <b-alert :show="errAlert" variant="danger"><span v-for="error in errLog.errMsg">{{error}}</span></b-alert> -->

        <b-form-row>
          <b-col cols="12">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="1"
                      label="Notification Name:"
                      label-for="eventName"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-input required id="eventName" v-model="formData.title" type="text" placeholder="Ex: Free food in SCET 800!" />
            <b-form-invalid-feedback>Please Enter a Notification Name/Title</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
        <b-col cols="12">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="1"
                      label="Audience:"
                      label-for="audience"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-select required id="audience" v-model="formData.audience" :options="['staff', 'students']" />
            <b-form-invalid-feedback>Please Select an Audience</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col cols="12">
            <b-form-group breakpoint="xl" 
                      label-size="sm"
                      label-cols="1"
                      label="Description:"
                      label-for="eventName"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-textarea required id="description" v-model="formData.description" rows="6" placeholder="Ex: Come grab leftovers from the catered breakfast"/>
            <b-form-invalid-feedback>Please Enter a Description for the Notification</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
        
        <b-form-row align-h="between">
          <b-col cols="12" md="6">
            <b-collapse id="noteLink" v-model="noteLink">
              <b-form-group breakpoint="xl" 
                    label-size="sm"
                    label-cols="1"
                    label="Link:"
                    label-for="Link"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-input type="url" id="link" v-model="formData.link" />
              <b-form-invalid-feedback>Please Enter a Valid Url</b-form-invalid-feedback>
            </b-form-group>
          </b-collapse>
            <b-link @click="noteLink = !noteLink" class="text-success">{{linkLabel}}</b-link>
          </b-col>

          <b-col cols="12" md="6">
              <b-form-group breakpoint="xl" 
                    label-size="sm"
                    label-cols="1"
                    label="Priority:"
                    label-for="Priority"> <!-- make breakpoints for better use of horizontal view -->
              <b-form-radio-group size="" button-variant="primary" id="priority" v-model="formData.priority" buttons :options="priorityOpts" />
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="text-right">
            <b-btn type="Submit" variant="success">Create</b-btn>
          </b-col>
        </b-form-row>

      </b-form>
    </b-card>
</div>
  </b-container>
</template>

<script>
export default {
  name: 'Notifications',
  props: { authUser: Object },
  data () {
    return {
      title: 'Create Notification',
      priorityOpts: [{value: 0, text: 'Low'}, {value: 1, text: 'High'}],
      noteLink: true,
      formData: { priority: 0 },
      submitted: false
    }
  },
  methods: {
    noteForm () { return document.getElementById('noteForm') },
    createNote () {
      this.submitted = true
      console.log(this.formData, this.noteForm().checkValidity())
      if (this.noteForm().checkValidity() === true) {
        // const body = {}
        // for (const pair of this.formData.entries()) {
        //   body[pair[0]] = pair[1]
        // }
        // fetch('https://websrvcs.sa.uic.edu/api/sao/announcements/', {method: 'post', body: JSON.stringify(this.formData), headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => console.log(res))
        console.log('This is for testing cannot allow real post to API')
        this.submitted = false
        this.formData = {}
      }
    }
  },
  computed: {
    linkLabel () {
      if (this.noteLink === true) {
        return '- Remove Link'
      } else return '+ Add a Link'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
