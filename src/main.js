import Vue from 'vue';
import store from './store';
import router from './router';
import './registerServiceWorker';

import ApiService from './services/api.service';

import DateFilter from './utils/filters/date.filter';
import ErrorFilter from './utils/filters/error.filter';

import App from './App.vue';

ApiService.init();

Vue.config.productionTip = false;

Vue.filter('data', DateFilter);
Vue.filter('error', ErrorFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
