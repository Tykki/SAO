<template>
  <div id="main-content">
    <b-row class="">
      <b-col cols="12">
        <h4 class="">Your Upcoming Events</h4>
      </b-col>
      <b-col sm="6" lg="3" v-for="(event, i) of upcomingEvents" :key="i">
        <b-card class="shadow-sm upcoming-events" :bg-variant="bgColor(i)" :text-variant="txtColor(i)"  @mouseover="hoverFocus = i" @mouseout="hoverFocus = null" :class="{'shadow-lg': hoverFocus === i}">
          <b-row class="ml-3">
            <h3 class="pl-3">{{time(event.startRange).format('DD')}}</h3>
            <b-col cols=""><p class="event-text" :class="{'text-dark': hoverFocus !== i}">{{time(event.startRange).format("MMM YYYY")}}<br><span :class="{'text-secondary': hoverFocus !== i}">{{time(event.startRange).format("hh:mm a")}}</span></p></b-col>
          </b-row>
          <b-row class="ml-3">
            <b-col :class="{'text-secondary': hoverFocus !== i}"><p>{{event.name}}</p></b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12" xl="9" class="accordionCol" order-xl="1" order="2">
        <loader-window :loading="isLoading">
          <b-row align-h="between" v-show="!isLoading">
            <b-col cols="1" class="">
              <h4 class="" >Events</h4>
            </b-col>
            <!-- <b-col align-self="end" lg="2">
              <p>Show: <span class="ml-1">All</span><icon style="font-size: 10px" class="mr-5 ml-1" icon="chevron-down" />
              <icon icon="search" /></p>
            </b-col> -->
          </b-row>
          <b-row v-show="!isLoading">
            <b-col id="nameLabel" cols="7" md="6" lg="5">
             <h6 class="">Name</h6> 
            </b-col>
            <b-col id="timeLabel" >
             <h6 class="">Time</h6>
            </b-col>
            <b-col id="dateLabel">
            <h6 class="text-right">Date</h6>
            </b-col>
            <b-col>
            <h6></h6>
            </b-col>
          </b-row>
          <transition name="fade" mode="out-in">
            <events-accordion v-if="this.filteredEvents.length > 0" :events="this.filteredEvents">
            </events-accordion>
            <div v-else style="height: 300px"></div>
          </transition>
        </loader-window>
      </b-col>

      <b-col xl="3" class="searchCol" order="1" order-xl="2">
        <b-row align-h="center">
          <b-col sm="6" md="12">
            <b-btn class="col" to="/form" variant="outline-success">Create Event</b-btn>
          </b-col>
        </b-row>

        <hr />

        <collapse-input class="shadow-sm" title="Search">
          <b-input-group >
            <b-form-input v-model="searchTitle" v-b-tooltip.focus="'Just start typing to search by title or theme'" v-b-tooltip.hover="'Just start typing to search by title or theme'"></b-form-input>
          </b-input-group>
        </collapse-input>

        <br/>
 
        <b-card class="shadow-sm" title-tag="h4" title="Filters" align="left">
          <b-row>
            <b-col>
              <b-card class="shadow-sm">
              <b-form-group class="card-text" label="Audience">
                <b-form-checkbox-group stacked button-variant="prime2" v-model="selectedAudiences" name="audienceCheckboxes" :options="audiences">
                </b-form-checkbox-group>
              </b-form-group>
              </b-card>  
            </b-col>
          </b-row>
          
          <b-row>
            <b-col cols="12" sm="6" xl="12">
              <b-card class="shadow-sm">
              <b-form-group class="card-text" label="Departments">
                <b-form-checkbox
                v-model="allSelected.departments"
                :indeterminate="allSelected.depInt"
                aria-describedby="selectedDepartments"
                aria-controls="selectedDepartments"
                @change="toggleAllDep"
                >
                  {{allSelected.departments ? 'Deselect All' : 'Select All'}}
                </b-form-checkbox>
                <b-form-checkbox-group id="selectedDepartments" stacked v-model="selectedDepartments" name="departmentCheckboxes" :options="departments">
                </b-form-checkbox-group>
              </b-form-group>
              </b-card>
              
            </b-col>
          

            <b-col cols="12" sm="6" xl="12">
              
          <b-card class="shadow-sm">
          <b-form-group class="card-text" label="Categories">
            <b-form-checkbox
                v-model="allSelected.categories"
                :indeterminate="allSelected.cateInt"
                aria-describedby="selectedCategories"
                aria-controls="selectedCategories"
                @change="toggleAllCat"
                >
                  {{allSelected.categories ? 'Deselect All' : 'Select All'}}
                </b-form-checkbox>
            <b-form-checkbox-group id="selectedCategories" stacked v-model="selectedCategories" name="categoriesCheckboxes" :options="categories">
            </b-form-checkbox-group>
          </b-form-group>
          </b-card>
            </b-col>
          </b-row>
<!--           <b-card class="shadow-sm">
          <b-form-group class="card-text" label="Week Selector">
            <date-picker ref="datePicker" :value="formatCurrentDate()" @input="updateDate($event)" />
          </b-form-group>
          </b-card>
 -->

          <transition name="compress" mode="out-in">
            <b-button block v-if="filtersEnabled" variant="secondary4" key="filEn" :pressed.sync="filtersEnabled">Disable</b-button>
            <b-button block v-if="!filtersEnabled" variant="outline-secondary4" key="filDis" :pressed.sync="filtersEnabled" @click="updateDate($refs.datePicker.$el.value)">Enable</b-button>
          </transition>
        </b-card>

      </b-col>

      <br/>
      <br/>
      <br/>
    </b-row>

  </div>
</template>

<script>

// todo input mask date

import { mapState } from 'vuex'
import EventView from './EventView'
import CollapseInput from './helpers/CollapseInput'
import EventsAccordion from './EventsAccordion'
import LoaderWindow from './LoaderWindow.vue'
import DatePicker from './DatePicker.vue'
// let Color = require('Color')
import _ from 'lodash'

export default {
  name: 'EventsViewer',
  // props: ['title', 'time'],
  data () {
    return {
      hoverFocus: null,
      upcomingEvents: [],
      // msg: console.log(this),
      events: [],
      categories: [],
      audiences: [],
      departments: [],
      selectedCategories: [],
      selectedAudiences: [],
      allSelected: {
        departments: true,
        depInt: false,
        categories: true,
        cateInt: false
      },
      selectedDepartments: [],
      selectedDate: Date.now(),
      startDate1: '',
      endDate1: '',
      searchTitle: '',
      filtersEnabled: false,
      filters: {
        'aud': {'evaluate': x => this.selectedAudiences.includes(x.audience)},
        'dep': {'evaluate': x => this.selectedDepartments.includes(x.department)},
        'cat': {'evaluate': x => this.selectedCategories.includes(x.category)}
        // 'dat': {'evaluate': x => x.occurrences.some(o => new Date(o.startDate) >= new Date(this.startDate1) && new Date(o.startDate) < new Date(this.endDate1))}
      },
      isLoading: false
    }
  },
  components: {
    EventView,
    CollapseInput,
    EventsAccordion,
    LoaderWindow,
    DatePicker
  },
  mounted () {
    this.load()
  },
  computed: {
    ...mapState(['time']),
    filteredEvents () {
      if (this.filtersEnabled) {
        return this.events.filter(x => {
          for (let filter in this.filters) {
            if (!this.filters[filter].evaluate(x)) {
              return false
            }
          }
          return x.name.toLowerCase().includes(this.searchTitle.toLowerCase()) || x.theme.toLowerCase().includes(this.searchTitle.toLowerCase())
        })
      } else {
        return this.events.filter(x => (x.name.toLowerCase().includes(this.searchTitle.toLowerCase()) || x.theme.toLowerCase().includes(this.searchTitle.toLowerCase())))
      }
    }
  },
  watch: {
    selectedDepartments (newVal, oldVal) {
      if (newVal.length === 0) {
        this.allSelected.depInt = false
        this.allSelected.departments = false
      } else if (newVal.length === this.departments.length) {
        this.allSelected.depInt = false
        this.allSelected.departments = true
      } else {
        this.allSelected.depInt = true
        this.allSelected.departments = false
      }
    },
    selectedCategories (newVal, oldVal) {
      if (newVal.length === 0) {
        this.allSelected.cateInt = false
        this.allSelected.categories = false
      } else if (newVal.length === this.categories.length) {
        this.allSelected.cateInt = false
        this.allSelected.categories = true
      } else {
        this.allSelected.cateInt = true
        this.allSelected.categories = false
      }
    },
    selectedDate: function (val) {
      alert('Date: ' + val)
    },
    searchTitle: function (val) {
      this.debouncedSearch(val)
    },
    filtersEnabled: function (val) {
      if (!val) {
        this.accordianIndex = -1
      }
    }
  },
  methods: {
    toggleAllDep (checked) {
      this.selectedDepartments = checked ? this.departments.slice() : []
    },
    toggleAllCat (checked) {
      this.selectedCategories = checked ? this.categories.slice() : []
    },
    txtColor (i) {
      if (this.hoverFocus === i) {
        return 'white'
      }
      if (i % 2 === 0) {
        return 'success'
      } else { return 'secondary4' }
    },
    bgColor (i) {
      if (this.hoverFocus === i) {
        return 'prime2'
      }
    },
    formatCurrentDate (date) {
      let d = new Date(Date.now())
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
    updateDate (x) {
      // this.selectedDate = new Date(new Date(x).getTime() + new Date(x).getTimezoneOffset()*60*1000)
      let y = new Date(x)

      let start = new Date(`${y.getUTCFullYear()}-${y.getMonth() + 1}-${y.getDate() - y.getDay()}`)
      let end = new Date(`${y.getUTCFullYear()}-${y.getMonth() + 1}-${y.getDate() + (7 - y.getDay())}`)
      this.startDate1 = new Date(start.getTime() + y.getTimezoneOffset() * 60000)
      this.endDate1 = new Date(end.getTime() + y.getTimezoneOffset() * 60000)
    },
    debouncedSearch: _.debounce((e) => {
      console.log(e)
    }, 500),
    wait: function (time) {
      return new Promise((resolve, reject) => setTimeout(resolve, time))
    },
    load: async function () {
      this.isLoading = true
      this.events = await (await fetch(`https://websrvcs.sa.uic.edu/api/sao/events/?token=${this.$store.getters.token}`)).json()
      // console.log(this.events)
      await this.wait(1000)

      this.categories = this.events
        .map(e => e.category)
        .filter((val, index, self) => {
          return self.indexOf(val) === index
        })
      this.selectedCategories = Array.from(this.categories)

      this.departments = this.events
        .map(e => e.department)
        .filter((val, index, self) => {
          return self.indexOf(val) === index
        })
      this.selectedDepartments = Array.from(this.departments)

      this.audiences = this.events
        .map(e => e.audience)
        .filter((val, index, self) => {
          return self.indexOf(val) === index
        })
      this.selectedAudiences = Array.from(this.audiences)

      this.events.forEach(event => {
        event['color'] = `rgb(${Math.floor(Math.random() * 256)} ,${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`
        if (event.occurrences.length !== 0) {
          event['startRange'] = new Date(event.occurrences.reduce((acc, curr) => {
            let a = new Date(acc.startDate)
            let b = new Date(acc.endDate)
            return (a < b) ? acc : curr
          }).startDate)
          event['endRange'] = new Date(event.occurrences.reduce((acc, curr) => {
            let a = new Date(acc.startDate)
            let b = new Date(acc.endDate)
            return (a > b) ? acc : curr
          }).startDate)
        }
      })

      let noDates = this.events.filter(x => { return !(x.startRange) })
      let dates = this.events.filter(x => { return (x.startRange) })
      dates.sort((x, y) => { return x.startRange - y.startRange })
      noDates.sort((x, y) => { return y.name > x.name })

      this.events = dates
      noDates.forEach(x => { this.events.push(x) })

      this.isLoading = false

      let eventArray = Array.from(this.filteredEvents)
      eventArray.reverse()
      for (let event of eventArray) {
        if (event.occurrences.length === 0) {
          continue
        } else if (this.upcomingEvents.length < 4) {
          this.upcomingEvents.push(event)
        }
      }
      this.upcomingEvents.reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
.event-text{
  
  margin-bottom: 5px;
}
p{
  font-size: .8rem;
  /*margin-bottom: 60px;*/
}
$bootstrapMd: 768px;
.searchCol{
  @media(min-width: $bootstrapMd) {
    padding-left:20px;
    border-left: 1px solid #ccc;
  }

  @media(max-width: $bootstrapMd) {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
}
.custom-control-label:before{
  background-color:red;
}
.custom-checkbox .custom-control-input:checked~.custom-control-label::before{
  background-color: red !important;
}

.accordionCol{
  padding-left: 0px;
  padding-right: 0px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .01s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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

.upcoming-events{
  &:hover{
    background-color: danger;
  }
}

#main-content {
  padding-bottom: 70px;
}

@media (max-width: 550px){
  #timeLabel{
   display:none;
  }
 }

 @media (max-width: 992px){
  #dateLabel{
   display:none;
  }
 }

</style>

