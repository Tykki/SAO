<template>
  <!-- <list-item></list-item> -->
  <b-list-group id="occurList">
    <b-list-group-item class="occurItem" href="#" variant="light" v-for="(item, i) in occurrences" :key="i">
      <b-row>
          <b-input-group class="">
            <b-col cols="12" sm="3" md="4" lg="3">
            <b-input-group-prepend class="">
              <b-btn size="" class="occurName w-100" disabled :variant="item.conflict ? 'danger' : 'primary'">{{item.locName ? item.locName : item.location}}</b-btn>
            </b-input-group-prepend>
            </b-col>
        <b-col cols="12" sm="8" lg="6" class="">
          <b-row class="occurDate">
            <b-col cols="12" sm="6">
                <b-input class="text-center w-100" v-if="$parent.event" size="" disabled :value="time(item.startDate).format('lll')"></b-input>
                <b-input class="text-center" v-else size="" disabled :value="time(item.startDate).format('lll')"></b-input>
            </b-col>
            <b-col cols="12" sm="6">
                <b-input class="text-center" v-if="$parent.event" size="" disabled :value="time(item.endDate).format('lll')"></b-input>
                <b-input class="text-center" v-else size="" disabled :value="time(item.endDate).format('lll')"></b-input>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="8" offset-sm="2" offset-lg="0" lg="3">
            <b-input-group-append class="">
              <b-btn size="" class="w-50" variant="info" @click="reqEdit(i, item)">Edit</b-btn>
              <b-btn size="" class="w-50" variant="danger" @click="reqDelete(i)">Delete</b-btn>
            </b-input-group-append>
        </b-col>
          </b-input-group>
      </b-row>
      <!-- <section class="text-right">
        <b-button size="sm" variant="info" @click="reqEdit(i, item)">Edit</b-button>
        <b-button size="sm" variant="danger" @click="reqDelete(i)">Delete</b-button>
        
      </section> -->
          
        
        
    </b-list-group-item>
  </b-list-group>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Occurance-List',
  props: ['occurrences', 'locations'],
  data () {
    return {
      size: screen.width
    }
  },
  mounted () {
    if (this.$parent.event) {
      console.log('yo yo')
      for (let occur of this.occurrences) {
        occur.location = occur.locationID
      }
      this.occurrences = Object.assign(this.occurrences, {location: this.occurrences.locationID})
    }
  },
  methods: {
    reqDelete (id) {
      this.$emit('deleteReq', id)
    },
    reqEdit (id, occur) {
      this.$emit('editReq', id, occur)
    }
  },
  computed: {
    ...mapState(['time']),
    mobile () {
      console.log(screen.width)
    }
  }
} // export
</script>



<style lang="scss" scoped>
  .occurItem {
    margin: auto;
    max-width: 1000px;
    border-left: none;
    border-right: none;
    &:first-child {
      border-top: none;
    }
    &:last-child {
      border-bottom: none;
    }
  }
  .occurDate {
    // margin-left: 0;
    // margin-right: 0;
  }
    @media screen and (max-width: 576px) {
      .occurName {
        width: 100%;
      }
    }
    @media screen and (min-width: 576px) {
      .col-sm-3 {
        padding-right: 0;
        padding-left: 0;
      }
      .col-sm-4 {
        padding-right: 0;
        // padding-left: 0;
      }
      .col-sm-6 {
        padding-right: 0;
        padding-left: 0;
      }
      .col-lg-3 {
        padding-right: 0;
        padding-left: 0;
      }
      .occurName {
        // width: 127px;
      }
    }
</style>