import Vue from 'vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';

Vue.use(Loading, {
  color: '#1976d2',
  loader: 'spinner',
  width: 96,
  height: 96,
});
