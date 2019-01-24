<template>
  <b-row id="">
      <b-col cols="12">
        <h4 class="">{{title ? title : "Upcoming Cards"}}</h4>
      </b-col>
      <b-col sm="6" lg="3" v-for="(item, i) of (upcoming ? upcoming : [])" :key="i">
        <b-card class="shadow-sm" :class="{'shadow-lg': hoverPack.hoverFocus === i}" :bg-variant="hoverPack.bgColor(i)" :text-variant="hoverPack.txtColor(i)"  @mouseover="hoverPack.hoverFocus = i" @mouseout="hoverPack.hoverFocus = null" @click="reqModal(item)">

          <div v-if="item.occurrences">
            <b-row class="ml-3">
              <h3 class="pl-3">{{time(item.startRange).format('DD')}}</h3>
              <b-col cols=""><p class="item-text">{{time(item.startRange).format("MMM YYYY")}}<br><span :class="{'text-secondary': hoverPack.hoverFocus !== i}">{{time(item.startRange).format("hh:mm a")}}</span></p></b-col>
            </b-row>
            <b-row class="ml-3">
              <b-col :class="{'text-secondary': hoverPack.hoverFocus !== i}"><p class="mb-0">{{item.name}}</p></b-col>
            </b-row>
          </div>

          <div v-if="item.priority">
            <b-row class="text-center">
              <b-col cols=""><p class="item-text" :class="{'text-dark': hoverPack.hoverFocus !== i}">{{item.title | truncate(29)}}<br><!-- <span v-if="item.link" :class="{'text-secondary': hoverPack.hoverFocus !== i}">{{item.link}}</span> --></p></b-col>
            </b-row>
            <b-row class="text-center">
              <b-col class="" :class="{'text-secondary': hoverPack.hoverFocus !== i}"><p class="item-text">{{item.description | truncate(30)}}</p></b-col>
            </b-row>
            <b-row class="">
              <p class="pl-1 font-weight-lighter font-italic mb-0" :class="{'text-secondary': hoverPack.hoverFocus !== i}"><small>Posted on: {{time(item.created_on).format("ll")}}</small></p>
              <!-- <b-col class="" :class="{'text-secondary': hoverPack.hoverFocus !== i}"><p>{{item.description | truncate(45)}}</p></b-col> -->
            </b-row>
            <b-row class="">
              <p class="pl-1 font-weight-lighter font-italic mb-0" :class="{'text-secondary': hoverPack.hoverFocus !== i}"><small>By: {{item.created_by}}</small></p>
              <!-- <b-col class="" :class="{'text-secondary': hoverPack.hoverFocus !== i}"><p>{{item.description | truncate(45)}}</p></b-col> -->
            </b-row>
          </div>

        </b-card>
      </b-col>
    </b-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'upcomingCards',
  props: ['title', 'upcoming'],
  data () {
    return {
      test: [{'id': 29, 'name': 'HR Workshop #3', 'description': 'Data for Professional Dev Section', 'link': null, 'theme': 'Pro Dev', 'status': 2, 'department': 7, 'category': 16, 'audience': 1, 'tableau': true, 'marketing_requested': true, 'marketing_info': '', 'ticketed': true, 'created_by': 'aekwej2@uic.edu', 'created_on': '2018-11-06T19:11:21.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2018-11-06T19:11:21.000Z', 'occurrences': [{'id': 31, 'eventId': 29, 'location': 22, 'address': '811 W. Maxwell St', 'startDate': '2018-11-26T06:00:00.000Z', 'endDate': '2018-12-01T05:59:00.000Z', 'note': '3 of 3', 'created_by': 'aekwej2@uic.edu', 'created_on': '2018-11-06T19:11:21.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2018-11-06T19:11:21.000Z'}], 'locationText': ['CMN', 'CMS', 'CMW', 'CTY', 'Forum', 'Harrison Field', 'JST', 'MRH', 'Pavilion', 'PSR', 'SCE', 'SRH', 'SCW', 'SSB', 'SRF', 'SSR', 'SFC', 'TBH', 'The Quad', 'University Hall', 'Other', 'Off-Campus'], 'audienceText': 'Staff', 'categoryText': 'Professional Development', 'departmentText': 'Counseling Center', 'statusText': 'confirmed', 'color': 'rgb(217 , 90,  24)', 'startRange': 'Mon Nov 26 2018 00:00:00', 'endRange': 'Mon Nov 26 2018 00:00:00'}, {'id': 35, 'name': 'Testing', 'description': 'test', 'link': null, 'theme': '', 'status': 2, 'department': 2, 'category': 4, 'audience': 2, 'tableau': true, 'marketing_requested': true, 'marketing_info': '', 'ticketed': true, 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-09T19:09:06.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-09T19:09:06.000Z', 'occurrences': [{'id': 37, 'eventId': 35, 'location': 6, 'address': null, 'startDate': '2019-01-09T06:00:00.000Z', 'endDate': '2019-01-10T18:00:00.000Z', 'note': '', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-09T19:09:06.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-09T19:09:06.000Z'}], 'locationText': ['CMN', 'CMS', 'CMW', 'CTY', 'Forum', 'Harrison Field', 'JST', 'MRH', 'Pavilion', 'PSR', 'SCE', 'SRH', 'SCW', 'SSB', 'SRF', 'SSR', 'SFC', 'TBH', 'The Quad', 'University Hall', 'Other', 'Off-Campus'], 'audienceText': 'Students', 'categoryText': 'Concert', 'departmentText': 'ACE', 'statusText': 'confirmed', 'color': 'rgb(214 , 220,  130)', 'startRange': 'Wed Jan 09 2019 00:00:00', 'endRange': 'Wed Jan 09 2019 00:00:00'}, {'id': 37, 'name': 'Testing Creation', 'description': 'Description is Required', 'link': null, 'theme': 'Rick and Morty', 'status': 2, 'department': 9, 'category': 4, 'audience': 2, 'tableau': true, 'marketing_requested': true, 'marketing_info': '', 'ticketed': true, 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T18:06:12.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T18:06:12.000Z', 'occurrences': [{'id': 40, 'eventId': 37, 'location': 6, 'address': null, 'startDate': '2019-01-11T06:00:00.000Z', 'endDate': '2019-01-12T18:00:00.000Z', 'note': '', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T18:06:12.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T18:06:12.000Z'}], 'locationText': ['CMN', 'CMS', 'CMW', 'CTY', 'Forum', 'Harrison Field', 'JST', 'MRH', 'Pavilion', 'PSR', 'SCE', 'SRH', 'SCW', 'SSB', 'SRF', 'SSR', 'SFC', 'TBH', 'The Quad', 'University Hall', 'Other', 'Off-Campus'], 'audienceText': 'Students', 'categoryText': 'Concert', 'departmentText': 'NASP', 'statusText': 'confirmed', 'color': 'rgb(160 , 138,  106)', 'startRange': 'Fri Jan 11 2019 00:00:00', 'endRange': 'Fri Jan 11 2019 00:00:00'}, {'id': 36, 'name': 'Test after logic change', 'description': 'Test', 'link': null, 'theme': 'Happy Thoughts', 'status': 1, 'department': 12, 'category': 6, 'audience': 2, 'tableau': true, 'marketing_requested': true, 'marketing_info': '', 'ticketed': true, 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T01:43:24.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T01:43:24.000Z', 'occurrences': [{'id': 38, 'eventId': 36, 'location': 6, 'address': null, 'startDate': '2019-01-15T06:00:00.000Z', 'endDate': '2019-01-16T18:00:00.000Z', 'note': '', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T01:43:24.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T01:43:24.000Z'}, {'id': 39, 'eventId': 36, 'location': 19, 'address': null, 'startDate': '2019-01-09T06:00:00.000Z', 'endDate': '2019-01-10T18:00:00.000Z', 'note': '', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T01:43:24.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T01:43:24.000Z'}], 'locationText': ['CMN', 'CMS', 'CMW', 'CTY', 'Forum', 'Harrison Field', 'JST', 'MRH', 'Pavilion', 'PSR', 'SCE', 'SRH', 'SCW', 'SSB', 'SRF', 'SSR', 'SFC', 'TBH', 'The Quad', 'University Hall', 'Other', 'Off-Campus'], 'audienceText': 'Students', 'categoryText': 'Fraternity/Sorority', 'departmentText': 'Student Development Services', 'statusText': 'tentative', 'color': 'rgb(213 , 221,  143)', 'startRange': 'Tue Jan 15 2019 00:00:00', 'endRange': 'Wed Jan 09 2019 00:00:00'}]
    }
  },
  created () {
  },
  computed: {
    ...mapState(['hoverPack', 'time'])
  },
  methods: {
    reqModal (item) {
      this.$emit('modalReq', item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p{
  font-size: .9rem;
  &:last-child {}
  /*margin-bottom: 60px;*/
}
.item-text{
  margin-bottom: 5px;
}

</style>
