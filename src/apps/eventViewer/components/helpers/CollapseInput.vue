<template>
<div>
<b-button block v-b-toggle="`coll${this.title}`" :variant="this.variant">{{this.title}}</b-button>
<b-collapse :id="`coll${this.title}`" class="mt-2" visible>
  <b-card :align="this.align">
      <slot></slot>
  </b-card>
</b-collapse>
</div>
</template>

<script>
export default{
  name: 'CollapseInput',
  props: {
    title: String,
    variant: {
      type: String,
      default: 'secondary'
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>