<template>
    <div id="app">
        <Login v-bind:style="{ display:isActiveLogin}"/>
    </div>
</template>
<script>
import Login from './components/Authentication/Login.vue'

export default {
    name: 'app',
    components: {
        Login
    },
    data() {
        return {
            isActiveLogin:'',
            baseApiUrl :process.env.VUE_APP_END_POINT
        }
    }
}
</script>
<style scoped>
@import "./assets/css/bootstrap.min.css" ;
@import "./assets/css/icons.css" ;
@import "./assets/css/metismenu.min.css" ;
@import "./assets/css/style.css" ;

.heading {
    color: #5d6dc3 !important;
    font-weight: bold;
}
</style>