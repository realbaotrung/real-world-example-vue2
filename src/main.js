import Vue from 'vue';
import store from './store/store';
import router from './router';
import './registerServiceWorker';

import {ApiService} from './services';

import filter from './utils/filters';

import AppLayout from './layout/index.vue';

ApiService.init();

Vue.config.productionTip = false;

Vue.filter('data', filter.formatDate);
Vue.filter('error', filter.formatErrorValue);

new Vue({
  router,
  store,
  render: (h) => h(AppLayout),
}).$mount('#app');
