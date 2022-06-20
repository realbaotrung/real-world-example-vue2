import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import DateFilter from './utils/filters/date.filter';
import ErrorFilter from './utils/filters/error.filter';
import ApiService from './services/api.service';

Vue.config.productionTip = false;

Vue.filter("data", DateFilter);
Vue.filter("error", ErrorFilter);

ApiService.init();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
