import Vue from 'vue';
import store from './store/store';
import router from './router';
import './registerServiceWorker';

import {ApiService} from './services';

import filter from './utils/filters';

import App from './App.vue';

ApiService.init();

Vue.config.productionTip = false;

Vue.filter('data', filter.formatDate);
Vue.filter('error', filter.formatErrorValue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
