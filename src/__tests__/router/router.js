import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const createRouter = (routes = []) => {
  return new VueRouter({
    mode: 'history',
    routes,
  });
};

export {createRouter};
