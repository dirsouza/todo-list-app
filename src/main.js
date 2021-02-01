import Vue from 'vue';
import i18n from 'Plugin/i18n';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './plugins/sweetalert2';
import './plugins/loading';

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
