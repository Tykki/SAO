<template>
  <b-container id="display" fluid>
    <div id="main-content">
 <!-- Alerts -->
 <b-alert
 show
 dismissible
 variant="info"
 >To manually rent a locker for a student, click an available locker below.</b-alert>
 <!-- Header -->
 <b-row style="margin-top:.75rem">
 <b-col>
 <h2>{{ headerText }}</h2>
 </b-col>
 </b-row>
 <!-- Search box -->
 <b-input-group prepend="Search">
 <b-form-input
 type="text"
 placeholder="Search for rentals by locker number, netid, or UIN"
 v-model="query"
 ></b-form-input>
 <b-input-group-append>
 <b-btn @click.stop.prevent="onLockerSearch" variant="outline-primary">Locker Number</b-btn>
 <b-btn @click.stop.prevent="onNetidSearch" variant="outline-primary">Netid</b-btn>
 <b-btn @click.stop.prevent="onUINSearch" variant="outline-primary">UIN</b-btn>
 </b-input-group-append>
 </b-input-group>
    <b-table :items="items" :fields="fields">
    <template slot="show_details" slot-scope="row">
 <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event -->
 <b-button
 size="sm"
 @click.stop="row.toggleDetails"
 class="mr-2"
 >{{ row.detailsShowing ? 'Hide' : 'Show'}} Details</b-button>
 <!-- In some circumstances you may need to use @click.native.stop instead -->
 <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
 <b-form-checkbox
 @click.native.stop
 @change="row.toggleDetails"
 v-model="row.detailsShowing"
 >Details via check</b-form-checkbox>
 </template>
    <template slot="row-details" slot-scope="row">
 <b-card>
 <b-row class="mb-2">
 <b-col sm="3" class="text-sm-right">
 <b>Age:</b>
 </b-col>
 <b-col>hello</b-col>
 </b-row>
 <b-row class="mb-2">
 <b-col sm="3" class="text-sm-right">
 <b>Is Active:</b>
 </b-col>
 <b-col>boo boo</b-col>
 </b-row>
 <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
 </b-card>
 </template>
  </b-table>
    </div>
  </b-container>
</template>

<script>
// import api from '@/api'
export default {
  data () {
    return {
      queryType: 'allLockers',
      query: '',
      locker: {
        name: null,
        typeName: null,
        lockSerial: null,
        combo: null,
        renterName: null,
        renterNetid: null,
        renterUIN: null
      },
      items: [{
        id: 4568,
        lock: {combo: 'Say Please', serial: 7777},
        name: 'TEST Locker 1',
        rental: {rentalid: null, netid: null, firstName: null, lastName: null, uin: null},
        tenant: {id: 4532, name: 'CSRC'},
        type: {typeName: 'Default Locker', rate: 0, typeid: 2571}
      },
      {
        id: 4591,
        lock: {combo: null, serial: null},
        name: 'No Lock test',
        rental: {rentalid: 57, netid: 'ccunni3', firstName: 'Cole', lastName: 'Cunningham', uin: 674128379},
        tenant: {id: 4532, name: 'CSRC'},
        type: {typeName: 'Default Locker', rate: 0, typeid: 2571}
      }],
      lockers: [],
      lockerID: 0,
      netid: '',
      fields: [
      { key: 'name', label: 'Locker Number', sortable: true },
      { key: 'typeName', sortable: true },
      { key: 'rate', sortable: true },
      { key: 'show_details' }
      ]
    }
  },
  computed: {
    // items () {
    //   return this.lockers.reduce((v, x) => {
    //     v.push({
    //       id: x.id,
    //       name: x.name,
    //       typeName: x.type.typeName,
    //       rate: this.getDisplayRate(x.type.rate),
    //       lockSerial: x.lock.serial,
    //       combo: x.lock.combo,
    //       type: x.type,
    //       lock: x.lock,
    //       rental: x.rental
    //     })
    //     return v
    //   }, [])
    // },
    headerText () {
      let text
      switch (this.queryType) {
        case 'lockerNumber':
          text = `Reservations for locker number: ${this.query}`
          break
        case 'uin':
          text = `Reservations for UIN: ${this.query}`
          break
        case 'netid':
          text = `Reservations for netid: ${this.query}`
          break
        case 'unrented':
          text = `Lockers available to rent`
          this.initState()
          break
        default:
          text = `Lockers available to rent`
          this.initState()
          break
      }
      return text
    }
  },
  methods: {
    onDetailShow (row) {
      console.log(row)
      row._showDetails = !row._showDetails
    },
    onRentClick (record) {
      console.log(record)
    },
    onContactClick (record) {
      console.log(record)
    },
    onTerminateClick (record) {
      console.log(record)
    },
    getDisplayRate (rate) {
      return rate === 0 ? 'Free' : rate
    },
    clearName () {
      this.netid = ''
    },
    handleOk (evt) {
 // Prevent modal from closing
      evt.preventDefault()
      if (!this.netid) {
        alert('Please complete the form')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
//       api
//       .manualRent({
//         lockerID: this.lockerID,
//         netid: this.netid
//       })
//       .then(() => {
//         this.clearName()
//         this.$refs.modal.hide()
//       })
//  .then(() => this.initState())
//  .catch(console.error)
    },
    handleRowClick (locker) {
      this.lockerID = locker.id
      this.locker = {
        name: locker.name,
        typeName: locker.type.typeName,
        lockSerial: locker.lock.serial,
        combo: locker.lock.combo,
        renterName: `${locker.rental.firstName} ${locker.rental.lastName}`,
        renterNetid: locker.rental.netid,
        renterUIN: locker.rental.uin,
        rentalID: locker.rental.rentalid
      }
      if (locker._rowVariant === 'warning') this.$refs.detail.show()
      else this.$refs.modal.show()
    },
    onDetailDelete (evt) {
    //   evt.preventDefault()
    //   if (confirm('Are you sure you want to delete this reservation?')) {
    //     api
    //     .deleteRental(this.locker.rentalID)
    //     .then(() => {
    //       this.$refs.detail.hide()
    //       this.initState()
    //     })
    //     .catch(console.error)
    //   }
    },
 // Search for reservations matching locker number
    onLockerSearch () {
    //   this.queryType = 'lockerNumber'
    //   const url = `https://websrvcs.sa.uic.edu/api/lrs/rentals/tenant?lockerNumber=${
    //   this.query
    //   }`
    //   api
    //   ._getJSON(url)
    //   .then(res => res.json())
    //   .then(rentals => (this.lockers = rentals))
    //   .catch(console.error)
    },
 // Search for reservations matching UIN
    onUINSearch () {
    //   this.queryType = 'uin'
    //   const url = `https://websrvcs.sa.uic.edu/api/lrs/rentals/tenant?uin=${
    //   this.query
    //   }`
    //   api
    //   ._getJSON(url)
    //   .then(res => res.json())
    //   .then(rentals => (this.lockers = rentals))
    //   .catch(console.error)
    },
 // Search for reservations matching Netid
    onNetidSearch () {
    //   this.queryType = 'netid'
    //   const url = `https://websrvcs.sa.uic.edu/api/lrs/rentals/tenant?netid=${
    //   this.query
    //   }`
    //   api
    //   ._getJSON(url)
    //   .then(res => res.json())
    //   .then(rentals => (this.lockers = rentals))
    //   .catch(console.error)
    },
    initState () {
    //   this.queryType = 'allLockers'
    //   this.query = ''
    //   api
    //   .getLockers()
    //   .then(data => (this.lockers = data))
    //   .catch(console.error)
    }
  },
  mounted () {
    this.initState()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
