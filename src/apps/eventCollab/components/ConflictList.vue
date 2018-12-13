<template>
  <!-- <list-item></list-item> -->
  <div>
    <h4 v-show="this.conflict">Conflict List</h4>
  <b-list-group id="conflictList">
    <b-list-group-item class="conflictItem" v-for="(conflict, i) in conflicts" :key="i" href="#" variant="light">
      <h4>
        {{conflict.name}}
      </h4>
      <b-input-group class="info" v-for="(item, v) in conflict.occurrences" :key="v">
        <b-input-group-prepend>
          <b-btn size="sm" disabled :variant="item.conflict">
            {{item.location}}
          </b-btn>
        </b-input-group-prepend>
          <b-input class="text-center" size="sm" type="datetime-local" disabled :value="item.startDate.slice(0, -1)" />
          <!-- {{item.startDate}} - -->
          <b-input class="text-center" size="sm" type="datetime-local" disabled :value="item.endDate.slice(0, -1)" />
          <!-- {{item.endDate}} -->
      </b-input-group>
    </b-list-group-item>
    <!-- <b-list-group-item class="occurItem" href="#" variant="light">item.location</b-list-group-item>
    <b-list-group-item class="occurItem" href="#" variant="light">item.location</b-list-group-item> -->
  </b-list-group>
  </div>
</template>

<script>

export default {
  name: 'Conflicts-List',
  props: ['occur'],
  data () {
    return {
      conflicts: []
    }
  },
  // created () {
  //   fetch('https://websrvcs.sa.uic.edu/api/sao/events/?startDate=2018-07-23T05:00:00.000Z&endDate=2018-07-24T05:00:00.000Z').then(res => res.json()).then(res => {
  //     $.each(res, (i, v) => {
  //       // console.log(i, v)
  //       this.conflicts.push(v)
  //     })
  //     // console.log(res)
  //     // this.conflicts.push(res)
  //     // console.log(res)
  //   })
  // },
  watch: {
    occur () {
      // console.log(this.occur)
      // console.log(this.conflicts)
      this.conflicts = []
      for (let match of this.occur) {
        console.log(match)
        fetch(`https://websrvcs.sa.uic.edu/api/sao/events/?token=${this.$parent.$parent.authUser.token}&startDate=${match.startDate}&endDate=${match.endDate}`).then(res => res.json()).then(res => {
          $.each(res, (i, v) => {
            // console.log(i, v)
            this.conflicts.push(v)
          })
        // console.log(res)
        // this.conflicts.push(res)
        // console.log(res)
        })
      }
    },
    conflicts () {
      // console.log('made it this far', this.conflicts, this.occur)
      for (let conflict of this.conflicts) {
        // console.log('made it this far as well', conflict)
        for (let c of conflict.occurrences) {
          // console.log('made it to the boss', c, this.occur.locName)
          let match = this.occur.find(ocr => ocr.locName === c.location)
          // console.log(match)
          if (match) {
            console.log('you have an issue', match)
            match.conflict = 'true'
            // console.log('matches were found', match)
            c.conflict = 'danger'
          }
          if (!match) {
            c.conflict = 'primary'
            // match.conflict = 'primary'
            console.log('not matches', match)
          }
        }
      }
    }
  }
  // components: {
  //   'list-item': ListItem
  // } // components

} // export
</script>



<style lang="scss" scoped>
  #conflictList {
    margin: 50px 0 50px 0;

  }
  .conflictItem {
    border-left: none;
    border-right: none;
    max-width: 1200px;
    margin: auto;
    &:first-child {
      border-top: none;
    }
    .info {
      margin-bottom: 10px;
      .input-group-prepend {
        width: 130px;
        button {
          width: inherit;
        }
      }
    }
  }
</style>