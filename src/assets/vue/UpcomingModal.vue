<template>
  <b-container  fluid id="">
      <upcoming-cards @modalReq="showModal" :upcoming="upcoming" :title="title" />

      <b-modal ok-only ok-title="Close" v-show="eventData" ref="eventModal">
        <event-view :event="eventData" />
      </b-modal>
      
      <b-modal ok-only ok-title="Close" v-show="postData" ref="postModal">
        <post-view :post="postData" />
      </b-modal>
      
  </b-container>
</template>
<script>
// import { mapState } from 'vuex'
import PostView from '@/assets/vue/PostView'
import UpcomingCards from '@/assets/vue/UpcomingCards'
import EventView from '@/apps/eventViewer/components/EventView'
export default {
  name: 'upcomingModal',
  props: ['title', 'upcoming'],
  components: { UpcomingCards, EventView, PostView },
  data () {
    return {
      eventData: { occurrences: [] },
      postData: {},
      test: [{'id': 29, 'name': 'HR Workshop #3', 'description': 'Data for Professional Dev Section', 'link': null, 'theme': 'Pro Dev', 'status': 2, 'department': 7, 'category': 16, 'audience': 1, 'tableau': true, 'marketing_requested': true, 'marketing_info': '', 'ticketed': true, 'created_by': 'aekwej2@uic.edu', 'created_on': '2018-11-06T19:11:21.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2018-11-06T19:11:21.000Z', 'occurrences': [{'id': 31, 'eventId': 29, 'location': 22, 'address': '811 W. Maxwell St', 'startDate': '2018-11-26T06:00:00.000Z', 'endDate': '2018-12-01T05:59:00.000Z', 'note': '3 of 3', 'created_by': 'aekwej2@uic.edu', 'created_on': '2018-11-06T19:11:21.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2018-11-06T19:11:21.000Z'}], 'locationText': ['CMN', 'CMS', 'CMW', 'CTY', 'Forum', 'Harrison Field', 'JST', 'MRH', 'Pavilion', 'PSR', 'SCE', 'SRH', 'SCW', 'SSB', 'SRF', 'SSR', 'SFC', 'TBH', 'The Quad', 'University Hall', 'Other', 'Off-Campus'], 'audienceText': 'Staff', 'categoryText': 'Professional Development', 'departmentText': 'Counseling Center', 'statusText': 'confirmed', 'color': 'rgb(217 , 90,  24)', 'startRange': 'Mon Nov 26 2018 00:00:00', 'endRange': 'Mon Nov 26 2018 00:00:00'}, {'id': 35, 'name': 'Testing', 'description': 'test', 'link': null, 'theme': '', 'status': 2, 'department': 2, 'category': 4, 'audience': 2, 'tableau': true, 'marketing_requested': true, 'marketing_info': '', 'ticketed': true, 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-09T19:09:06.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-09T19:09:06.000Z', 'occurrences': [{'id': 37, 'eventId': 35, 'location': 6, 'address': null, 'startDate': '2019-01-09T06:00:00.000Z', 'endDate': '2019-01-10T18:00:00.000Z', 'note': '', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-09T19:09:06.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-09T19:09:06.000Z'}], 'locationText': ['CMN', 'CMS', 'CMW', 'CTY', 'Forum', 'Harrison Field', 'JST', 'MRH', 'Pavilion', 'PSR', 'SCE', 'SRH', 'SCW', 'SSB', 'SRF', 'SSR', 'SFC', 'TBH', 'The Quad', 'University Hall', 'Other', 'Off-Campus'], 'audienceText': 'Students', 'categoryText': 'Concert', 'departmentText': 'ACE', 'statusText': 'confirmed', 'color': 'rgb(214 , 220,  130)', 'startRange': 'Wed Jan 09 2019 00:00:00', 'endRange': 'Wed Jan 09 2019 00:00:00'}, {'id': 37, 'name': 'Testing Creation', 'description': 'Description is Required', 'link': null, 'theme': 'Rick and Morty', 'status': 2, 'department': 9, 'category': 4, 'audience': 2, 'tableau': true, 'marketing_requested': true, 'marketing_info': '', 'ticketed': true, 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T18:06:12.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T18:06:12.000Z', 'occurrences': [{'id': 40, 'eventId': 37, 'location': 6, 'address': null, 'startDate': '2019-01-11T06:00:00.000Z', 'endDate': '2019-01-12T18:00:00.000Z', 'note': '', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T18:06:12.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T18:06:12.000Z'}], 'locationText': ['CMN', 'CMS', 'CMW', 'CTY', 'Forum', 'Harrison Field', 'JST', 'MRH', 'Pavilion', 'PSR', 'SCE', 'SRH', 'SCW', 'SSB', 'SRF', 'SSR', 'SFC', 'TBH', 'The Quad', 'University Hall', 'Other', 'Off-Campus'], 'audienceText': 'Students', 'categoryText': 'Concert', 'departmentText': 'NASP', 'statusText': 'confirmed', 'color': 'rgb(160 , 138,  106)', 'startRange': 'Fri Jan 11 2019 00:00:00', 'endRange': 'Fri Jan 11 2019 00:00:00'}, {'id': 36, 'name': 'Test after logic change', 'description': 'Test', 'link': null, 'theme': 'Happy Thoughts', 'status': 1, 'department': 12, 'category': 6, 'audience': 2, 'tableau': true, 'marketing_requested': true, 'marketing_info': '', 'ticketed': true, 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T01:43:24.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T01:43:24.000Z', 'occurrences': [{'id': 38, 'eventId': 36, 'location': 6, 'address': null, 'startDate': '2019-01-15T06:00:00.000Z', 'endDate': '2019-01-16T18:00:00.000Z', 'note': '', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T01:43:24.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T01:43:24.000Z'}, {'id': 39, 'eventId': 36, 'location': 19, 'address': null, 'startDate': '2019-01-09T06:00:00.000Z', 'endDate': '2019-01-10T18:00:00.000Z', 'note': '', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-10T01:43:24.000Z', 'updated_by': 'aekwej2@uic.edu', 'updated_on': '2019-01-10T01:43:24.000Z'}], 'locationText': ['CMN', 'CMS', 'CMW', 'CTY', 'Forum', 'Harrison Field', 'JST', 'MRH', 'Pavilion', 'PSR', 'SCE', 'SRH', 'SCW', 'SSB', 'SRF', 'SSR', 'SFC', 'TBH', 'The Quad', 'University Hall', 'Other', 'Off-Campus'], 'audienceText': 'Students', 'categoryText': 'Fraternity/Sorority', 'departmentText': 'Student Development Services', 'statusText': 'tentative', 'color': 'rgb(213 , 221,  143)', 'startRange': 'Tue Jan 15 2019 00:00:00', 'endRange': 'Wed Jan 09 2019 00:00:00'}],
      test2: [{'id': 94, 'title': 'word?', 'description': 'its the same code...', 'created_by': 'aekwej2@uic.edu', 'created_on': '2018-12-21T17:47:10.000Z', 'audience': 'staff', 'link': null, 'priority': 1}, {'id': 112, 'title': 'Hello from Friday', 'description': 'jake is the worst', 'created_by': 'vpatan2@uic.edu', 'created_on': '2019-01-11T23:45:16.000Z', 'audience': 'staff', 'link': null, 'priority': 1}, {'id': 114, 'title': 'Test for Long Description and Title of Announcemen', 'description': 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,  sunt in culpa qui officia deserunt mollit anim id est laborum.', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-17T21:44:10.000Z', 'audience': 'staff', 'link': 'http://uic.edu', 'priority': 1}, {'id': 115, 'title': 'Test for Long Description and Title of Announcemen', 'description': 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,  sunt in culpa qui officia deserunt mollit anim id est laborum.', 'created_by': 'aekwej2@uic.edu', 'created_on': '2019-01-17T21:44:51.000Z', 'audience': 'staff', 'link': 'http://uic.edu', 'priority': 1}]
    }
  },
  created () {
  },
  computed: {
    // ...mapState(['hoverPack', 'time'])
  },
  methods: {
    showModal (item) {
      if (item.occurrences) {
        this.$refs.eventModal.show()
        this.eventData = Object.assign({}, item)
        // console.log(`Test Complete: ${item.name}`)
        return this.eventData
      }
      if (item.priority) {
        this.$refs.postModal.show()
        this.postData = Object.assign({}, item)
        // console.log(`Test Complete: ${item.title}`)
        return this.postData
      }
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
