import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// filters
Vue.filter('capitalize',function(string){
  if(string==""|| string == null) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
});
// filters
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
