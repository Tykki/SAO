<template>

  <b-card class="shadow-sm" title-tag="h4" :title="title ? title : 'Accordion Card'">
              <b-list-group>
                <b-list-group-item v-for="(item, i) of data" :key="i" button>
                  <b-row>
                    <b-col v-b-toggle="`detail${i}`">
                      <span>{{item.name}}</span><br/>
                      <small class="text-secondary"><b>{{time(item.occurrences[0].startDate).format("DD MMM YYYY")}}, {{item.occurrences[0].location}}</b></small>
                    </b-col>
                    <b-col cols="12" sm="2" md="3" xl="2" align-self="center">
                      <b-btn class="proDevBtn text-white" size="sm" :variant="btnColor(i)" :href="item.signupLink" target="_blank">Sign Up</b-btn>
                    </b-col>
                  </b-row>
                <b-collapse :id="`detail${i}`" accordion="proDev">
                  <event-view :event="item" :proDev="true" />
                </b-collapse>
                  
                </b-list-group-item>
              </b-list-group>
            </b-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import eventView from '@/apps/eventViewer/components/EventView'
export default {
  props: {title: String, proDev: Boolean},
  components: { eventView },
  name: 'AccordionCard',
  data () {
    return {
      data: [],
      sampleData: [{
        name: 'Sample Event Name 1',
        occurrences: [{location: 'NeverLand', startDate: new Date('1994-06-06'), endDate: Date.now()}, {location: 'Disney World', startDate: new Date('1994-06-06'), endDate: Date.now()}]
      },
      {
        name: 'Sample Event Name 1x',
        occurrences: [{location: 'NeverLand', startDate: new Date('2018-06-06'), endDate: Date.now()}, {location: 'Disney World', startDate: new Date('1994-06-06'), endDate: Date.now()}]
      },
      {
        name: 'Sample Event Name 2',
        occurrences: [{location: 'Astro World', startDate: new Date('2021-06-06'), endDate: Date.now()}, {location: 'Wakanda', startDate: Date.now(), endDate: Date.now()}]
      },
      {
        name: 'Sample Event Name 3',
        occurrences: [{location: 'Magic Mountain', startDate: new Date('2020-06-06'), endDate: Date.now()}, {location: 'Lake Amazing', startDate: Date.now(), endDate: Date.now()}]
      }]
    }
  },
  mounted () {
    this.proDev ? this.initProDev() : (this.data = this.sampleData)
  },
  methods: {
    btnColor (i) {
      return (i % 2) ? 'prime2' : 'warning'
    },
    dateCheck (data) {
      let current = []
      for (let curr of data) {
        if (this.time(curr.occurrences[0].startDate) > this.time()) {
          current.push(curr)
        }
      }
      current.sort((i, v) => (this.time(i.occurrences[0].startDate) > this.time(v.occurrences[0].startDate)) ? 1 : -1)
      this.data = Array.from(current)
    },
    initProDev () {
      fetch(`https://websrvcs.sa.uic.edu/api/sao/events/?token=${this.token}&category=16`).then(res => res.json()).then(res => {
        res.forEach((i, v) => {
          if (this.data.length < 3) {
            this.data.push(i)
          }
        })
        this.dateCheck(this.data)
      })
    }
  },
  computed: {
    ...mapState(['time']),
    ...mapGetters(['token'])
  }
}
</script>
<style lang="scss" scoped>
.proDevBtn{
  border-radius: 21px
}
</style>
