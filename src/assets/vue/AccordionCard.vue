<template>

  <b-card class="shadow-sm" title-tag="h4" :title="title ? title : 'Accordion Card'">
              <b-list-group>
                <b-list-group-item v-for="(item, i) of (data ? data : sampleData)" :key="i" button>
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
  props: ['title', 'data'],
  components: { eventView },
  name: 'AccordionCard',
  data () {
    return {
      sampleData: [{
        name: 'Sample Event Name 1',
        occurrences: [{location: 'NeverLand', startDate: new Date('1994-06-06'), endDate: Date.now()}, {location: 'Disney World', startDate: new Date('1994-06-06'), endDate: Date.now()}]
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
    console.log(this.sampleData)
    this.dateCheck()
  },
  methods: {
    btnColor (i) {
      if (i === 1) {
        return 'prime2'
      } else { return 'warning' }
    },
    dateCheck () {
      let current = []
      for (let curr of this.sampleData) {
        if (curr.occurrences[0].startDate > this.time()) {
          // console.log(curr)
          current.push(curr)
          // this.samplecurr.pop()
        }
      }
      this.sampleData = Array.from(current)
    },
    initProDev () {
      // fetch(`https://websrvcs.sa.uic.edu/api/sao/events/?token=${this.authUser.token}&category=16`).then(res => res.json()).then(res => {
      //   $.each(res, (i, v) => {
      //     if (this.proDev.length < 3) {
      //       this.proDev.push(v)
      //     }
        // this.$set(this.proDev, `event${[i]}`, v)
        // })
      // })
    }
  },
  computed: {
    ...mapState(['time']),
    ...mapGetters(['token']),
    cardData () {
      if (this.data) {
        return Array.from(this.data)
      } else { return Array.from(this.sampleData) }
      // this.data ? Array.from(this.data) : Array.from(this.sampleData)
    }

  }
}
</script>
<style lang="scss" scoped>
.proDevBtn{
  border-radius: 21px
}
</style>
