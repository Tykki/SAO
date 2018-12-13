<template>
  <div>
  <b-button v-b-modal.formModal @click="clearErrMsgs()" variant="primary">Add Occurrence</b-button>

  <!-- Modal Component -->
  <b-modal ref="formModal" ok-title="Continue" cancel-title="Add Another" id="formModal" size="lg" title="Event Occurrences" @ok="addOccur" @cancel.prevent="addOccur">
    
      
      <b-form-group breakpoint="lg"
                label-size="sm"
                label-cols="1"
                label="Location"
                label-for="location">
        <b-form-select id="locations" :state="modalErrLog.state.locations" v-model="modalData.location" :options="locations" :required="modalData.required"/>
          <b-form-invalid-feedback class="text-left">Please Select a Location</b-form-invalid-feedback>
      </b-form-group>
        
      <b-form-group v-show="addy" breakpoint="lg"
                label-size="sm"
                label-cols="1"
                :label="addyLabel"
                label-for="address">
        <b-form-input id="address" :state="modalErrLog.state.address" v-model="modalData.address" placeholder="Where is Your Event?" :required="modalData.required"/>
          <b-form-invalid-feedback class="text-left">Please Enter a {{addyLabel}}</b-form-invalid-feedback>
      </b-form-group>
      
      <b-form-row >
        <b-col sm="12" md="6">
          <b-form-group
                
                label-cols="2"
                label="Start:"
                label-for="start">
            <b-form-input id="start" :state="modalErrLog.state.start" v-model="modalData.startDate" type="datetime-local" :required="modalData.required"/>
          <b-form-invalid-feedback class="text-left">Please Enter a Start Date</b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col sm="12" md="6">
          <b-form-group
                
                label-cols="2"
                label="End:"
                label-for="end">
            <b-form-input id="end" :state="modalErrLog.state.end" v-model="modalData.endDate" type="datetime-local" :required="modalData.required"/>
          <b-form-invalid-feedback class="text-left">Please Enter an End Date</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-group breakpoint="lg"
                  label-size=""
                  label-cols="1"
                  label="Note:"
                  label-for="note">
              <b-form-input id="note" v-model="modalData.note" />
      </b-form-group>

      <b-alert v-for="(error, i) in modalErrLog.errMsg" :key="i" show variant="danger">{{error}}</b-alert>
  
  </b-modal>
</div>
</template>

<script>
  export default {
    name: 'formModal',
    props: ['locations'],
    data () {
      return {
        // locations: [],
        modalErrLog: {
          errCount: 0,
          errMsg: [],
          state: {
            locations: null,
            start: null,
            end: null,
            address: null
          }
        },
        modalData: { required: true },
        occurrences: [],
        Cnote: false
      }
    },
    methods: {
      modalCheck () {
        this.modalErrLog = {
          errCount: 0,
          errMsg: [],
          state: {
            locations: null,
            start: null,
            end: null,
            address: null
          }
        }
        if (this.modalData.location === undefined) {
          this.modalErrLog.errCount ++
          this.modalErrLog.state.locations = false
        }
        if ((this.modalData.startDate === undefined) || (this.modalData.startDate === null)) {
          this.modalErrLog.errCount ++
          this.modalErrLog.state.start = false
        }
        if ((this.modalData.endDate === undefined) || (this.modalData.endDate === null)) {
          this.modalErrLog.errCount ++
          this.modalErrLog.state.end = false
        }
        if (this.addy) {
          if ((this.modalData.address === undefined) || (this.modalData.address === null)) {
            this.modalErrLog.errCount ++
            this.modalErrLog.state.address = false
          }
        }
        if (this.modalErrLog.errCount > 0) {
          return false
        }
        if (this.modalErrLog.errCount === 0) {
          this.modalData.required = false
          return true
        }
      },
      clearModal () {
        this.modalData = {}
      },
      clearErrMsgs () {
        this.modalErrLog.errMsg = []
      },
      addOccur () {
        if (this.modalCheck()) {
          // console.log(this.modalErrLog.errMsg)
          this.occurrences.push({
            conflict: undefined,
            location: this.modalData.location,
            locName: this.locations[this.modalData.location - 1].text,
            startDate: new Date(this.modalData.startDate).toISOString(),
            strt: this.modalData.startDate,
            fin: this.modalData.endDate,
            endDate: new Date(this.modalData.endDate).toISOString(),
            address: this.modalData.address,
            note: this.modalData.note ? this.modalData.note : ''
          })
          this.clearModal()
          this.$emit('addOccur', this.occurrences)
          // console.log(this.occurrences)
          // for (let loc of this.locations) {
          //   console.log(loc.text)
          // }
        }
      },
      editOccur (id, occur) {
        this.$refs.formModal.show()
        this.modalData = Object.assign(occur, {startDate: occur.strt, endDate: occur.fin})
        console.log(this.modalData)
      }
    },
    computed: {
      addy () {
        if ((this.modalData.location === 6) || (this.modalData.location === 19) || (this.modalData.location === undefined)) {
          return false
        } else return true
      },
      addyLabel () {
        if ((this.modalData.location === 22) || this.modalData.location === 21) {
          return 'Address:'
        } else return 'Room #'
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
  padding-left: 120px;
  padding-right: 120px;
}
.card{
  margin-right: auto;
    margin-left: auto;
    max-width: 1354px;
}
.alert{
  text-align: center;
}
h1, h2 {
  font-weight: normal;
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
