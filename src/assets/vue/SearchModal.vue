<template>
  <div>
    <b-input-group id="headSearch" size="sm" >
      <b-input-group-append class="align-self-center"><icon icon="search"/></b-input-group-append>
      <input class="form-control" @keyup.enter="openModal" type="search" id="searchBar" placeholder="Search..." size="sm" v-model="queryData"/>
    </b-input-group>


  <!-- Modal Component -->
  <b-modal ref="searchModal" ok-title="Search" @ok.prevent="search" cancel-title="Cancel" id="searchModal" title="Resource Search">
    
      <b-form-group breakpoint="lg"
                label-size="sm"
                label-cols="1"
                label=""
                label-for="Search">
        <b-form-input id="resSearch" v-model="queryData" />
      </b-form-group>

      <b-list-group>
        <b-list-group-item v-for="(res, i) of results" :key="i" :href="res.url ? res.url : '#'" target="_blank"><icon v-if="res.icon" :icon="res.icon" class="mr-2" /> {{res.name}}</b-list-group-item>
      </b-list-group>

  </b-modal>
</div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'searchModal',
    props: ['resources'],
    data () {
      return {
        queryData: ''
      }
    },
    methods: {
      openModal (event) {
        this.$refs.searchModal.show()
        this.search()
      },
      search () {
        return this.results
      }
    },
    computed: {
      results () {
        if (this.queryData === '') {
          return []
        }

        let subLvl = []
        _.find(this.resources, (res) => {
          _.find(res.resources, (item) => {
            if (item.name.toLowerCase().includes(this.queryData.toLowerCase())) {
              item.icon = res.icon
              subLvl.push(item)
            }
          })
        })
        let test3 = [...subLvl]
        return test3
      }
    },
    watch: {
      queryData (val) {
        _.debounce((val) => {
          console.log(val)
        }, 500)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#headSearch{
    margin-top: 7px;
    background: #f8f8f8;
    padding-left: 14px;
    border-radius: 4px;
  }
  #searchBar{
    border: none;
    background: inherit;
  }
</style>
