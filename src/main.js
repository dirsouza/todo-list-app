import Vue from 'vue';
import i18n from 'Plugin/i18n';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
