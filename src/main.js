import Vue from 'vue';
import store from './store';
import router from './router';
import './registerServiceWorker';

import {ApiService} from './services';

import filters from './utils/filters';

import AppLayout from './layout/index.vue';

ApiService.init();

Vue.config.productionTip = false;

Vue.filter('date', filters.formatDate);
Vue.filter('error', filters.formatErrorValue);

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch('auth/checkAuth')]).then(next),
);

new Vue({
  router,
  store,
  render: (h) => h(AppLayout),
}).$mount('#app');
