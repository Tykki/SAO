<template>
  <!-- <list-item></list-item> -->
  <b-list-group id="occurList">
    <b-list-group-item class="occurItem" href="#" variant="light" v-for="(item, i) in occurrences" :key="i">
      <b-row>
        
          <b-input-group>
            <b-input-group-prepend>
              <b-btn size="sm" disabled :variant="item.conflict ? 'danger' : 'primary'">{{locations[item.location - 1].text}}</b-btn>
              
            </b-input-group-prepend>
            <b-input size="sm" disabled type="datetime-local" :value="item.strt"></b-input>
            <b-input size="sm" disabled type="datetime-local" :value="item.fin"></b-input>
            
          </b-input-group>
          
        
        
      </b-row>
      <section class="text-right">
        <b-button size="sm" variant="info" @click="reqEdit(i, item)">Edit</b-button>
        <b-button size="sm" variant="danger" @click="reqDelete(i)">Delete</b-button>
        
      </section>
          
        
        
    </b-list-group-item>
  </b-list-group>
</template>

<script>

// import ListItem from './ListItem.vue'

export default {
  name: 'Occurance-List',
  props: ['occurrences', 'locations'],
  data () {
    return {
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
  watch: {
    item () {
      console.log('error testing')
    }
  }
} // export
</script>



<style lang="scss" scoped>
  .occurItem {
    border-left: none;
    border-right: none;
    &:first-child {
      border-top: none;
    }
    input {
      padding-right: 0;
    }
  }
</style>