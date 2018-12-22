<template>
  <div>
    <b-btn @click="openModal" variant="outline-secondary"><icon :icon="['far', 'edit']" /></b-btn>



  <!-- Modal Component -->
  <b-modal size="lg" ref="editModal" hide-footer ok-title="Update" cancel-title="Delete" title="Event Updater">
    
      <update-form :event="event"></update-form>

  </b-modal>
</div>
</template>

<script>
  import UpdateForm from '@/apps/eventCollab/components/EventForm'
  export default {
    name: 'editModal',
    components: { 'update-form': UpdateForm },
    props: ['event'],
    data () {
      return {
        hmm: this.$store
      }
    },
    created () {
    },
    methods: {
      openModal () {
        this.$refs.editModal.show()
      }
    },
    computed: {
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
