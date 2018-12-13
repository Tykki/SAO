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
                label="Search"
                label-for="Search">
        <b-form-input id="resSearch" v-model="queryData" />
      </b-form-group>

      <b-list-group>
        <b-list-group-item href="#">This is a default list group item</b-list-group-item>
      </b-list-group>

  </b-modal>
</div>
</template>

<script>
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
      }
    },
    computed: {
      search () {
        this.resources.filter(resource => {
          console.log(resource.name)
        })
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
