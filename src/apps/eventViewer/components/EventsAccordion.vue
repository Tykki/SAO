<template>
  <div role="tablist">
    <transition-group name="slide-fade">
      <b-card no-body class="mb-2 shadow-sm" @mouseover="hoverFocus = index" @mouseout="hoverFocus = null" :class="{'shadow-lg': hoverFocus === index}" v-for="(event, index) in this.events" v-bind:key="index">
        <b-card-header class="p-1" role="tab" @click="setActive(index)">
          <b-button block href="#" v-b-toggle="`a${index}`" variant="outline-white" :class="{active: isActive === index}">
            <b-container>
              <b-row>
                <b-col id="eventTitle" cols="7" md="6" lg="5" class="text-left">
                  <!-- <b-badge class="align-middle" pill :style="{background: event.color, zIndex: '50'}">&nbsp;</b-badge> -->
                  <span v-if="tMore() === 25">{{event.name | truncate(25)}}</span>
                  <span v-if="tMore() === 35">{{event.name | truncate(35)}}</span>
                  <span v-if="tMore() === 45">{{event.name | truncate(45)}}</span>
                  <span v-if="tMore() === 60">{{event.name | truncate(60)}}</span>
                  <span v-if="tMore() === undefined">{{event.name | truncate(60)}}</span>
                </b-col>
                <!-- <b-col id="eventTime" class="text-left">
                  {{event.occurrences[0] ? new Date(event.occurrences[0].startDate).toLocaleTimeString() : null}}
                </b-col> -->
                <b-col class="text-right" style="margin-right: -20px">
                  <span id="eventDate" v-if="event.startRange && event.endRange" class="pr-2 mr-5">
                    {{new Date(event.startRange).toLocaleDateString()}} - {{new Date(event.endRange).toLocaleDateString()}}
                    &nbsp;
                  </span>
                  <transition name="rotate-fade" mode="out-in">
                    <icon icon="minus" key="fa-minus" fixed-width v-if="activeIndex === index" />
                    <icon icon="plus" key="fa-plus" v-if="!(activeIndex === index)" fixed-width/>
                  </transition> &nbsp;
                </b-col>
              </b-row>
            </b-container>
          </b-button>
        </b-card-header>
        <!-- IF HIDE INDEX IS SAME AS SHOW, SET TO -1 (ALL ARE COLLAPSED) -->
        <b-collapse :id="`a${index}`" accordion="test-accordion" role="tabpanel" @show="activeIndex = index" @hide="hideIndex(index)">
          <b-card-body>
            <event-view @reqUpdate="handleReq" :event="event"></event-view>
          </b-card-body>
        </b-collapse>
      </b-card>
    </transition-group>
  </div>
</template>

<script>

import EventView from './EventView'

export default{
  name: 'EventsAccordion',
  components: { EventView },
  props: {
    events: Array
  },
  data () {
    return {
      hoverFocus: null,
      activeIndex: -1,
      isActive: null
    }
  },
  computed: {},
  methods: {
    handleReq (event) {
      console.log(event)
    },
    tMore () {
      if (screen.width < 375) {
        return 25
      }
      if (screen.width >= 375 && screen.width < 475) {
        return 35
      }
      if (screen.width >= 475 && screen.width < 515) {
        return 45
      }
      if (screen.width >= 515 && screen.width <= 550) {
        return 60
      }
    },
    hideIndex: function (i) {
      if (this.activeIndex === i) {
        this.activeIndex = -1
      }
    },
    setActive (data) {
      // console.log(data)
      if (this.isActive === data) {
        this.isActive = null
      } else { this.isActive = data }
      return this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
$bootstrapMd: 768px;
.slide-fade-enter-active {
  transition: all .2s ease-in;
}
.slide-fade-leave-active {
  transition: all .2s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-30px);
  opacity: 0;
}

.rotate-fade-enter-active {
  transition: all .15s ease-in;
}
.rotate-fade-leave-active {
  transition: all .15s ease-out;
}
.rotate-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: rotateZ(180deg);
  opacity: 0;
}

.rotate-fade-leave-to{
  transform: rotateZ(-179deg);
  opacity: 0;
}


.card-header{
  background-color: white;
  border-bottom: none;
  transition: all .2s ease-in;
  &:hover{
    background-color: #00B5E2;
    a{
      color: white;
    }
  }
}
.card{
  border: none;
}

//  #eventTitle{
  /*overflow-x: hidden;*/
//  }

 @media (max-width: 550px){
  #eventTime{
   display:none;
  }
 }

 @media (max-width: 992px){
  #eventDate{
   display:none;
  }
 }

</style>
