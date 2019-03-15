<template>
  <b-container id="footer" fluid>
        <b-row align-h="center">
            <b-col cols="6">
              <p class="text-left">© {{new Date().getFullYear()}} The Board of Trustees of the University of Illinois | <b-link target="_blank"class="text-prime2" href="https://www.vpaa.uillinois.edu/resources/web_privacy">Privacy Statement</b-link></p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'sao-footer',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #footer{
    box-shadow: 0 4px 0px 0 rgba(0, 0, 0, 0.2), 5px 4px 20px 0 rgba(0, 0, 0, 0.19);
    width: calc(100% - 300px);
    float: right;
    text-align: center;
    /*height: 56px;*/
    right: 0;
    bottom: 0;
    position: relative;
    font-size: 14px;
    .row{
      height: 100%;
      margin-top: 10px;
    }
  }

</style>
