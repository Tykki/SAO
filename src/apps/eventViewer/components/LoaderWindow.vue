<template>
<b-container>
  <slot></slot>
  <transition name="fade">
  <div class="loader" v-if="loading">
    <b-row class="align-items-center justify-content-center" style="height: 100%; width: 100%; margin: 0px">
      <b-col class="col align-self-center" style="text-align:center">
        <icon class="pulse" :icon="['fa', 'sync']" style="color: rgba(0, 0, 0, 0.5); text-align:center" size="10x"></icon>
      </b-col>
    </b-row>
  </div>
</transition>
</b-container>
</template>

<script>

// import EventView from './EventView'

export default {
  name: 'LoaderWindow',
  props: {
    loading: Boolean
  }
  // components:{EventView},
}
</script>

<style lang="scss" scoped>
.loader{
  position: absolute;
  left:0;
  top: 0;
  background: rgba(0,0,0,0.1);
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.pulse {
  -webkit-animation: pulse 5s infinite linear;
  animation: pulse 5s infinite linear;
}

@keyframes pulse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
</style>
