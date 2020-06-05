<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      baseApiUrl :process.env.VUE_APP_END_POINT,
      config:null
    }
  }
  

}
</script>

<style>


</style>
