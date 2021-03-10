import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VueToast,
  render: h => h(App)
}).$mount("#app");