import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {getItemFromLS, storageItem} from '@/utils/storage.utils';

const API_URL = process.env.VUE_APP_API_URL;

export const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${getItemFromLS(
      storageItem.ID_TOKEN_KEY,
    )}`;
  },

  // TODO: Review Custom Error handling
  // https://javascript.info/custom-errors#wrapping-exceptions

  async query(resource, params) {
    return Vue.axios.get(resource, params);
  },

  async get(resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`);
  },

  async post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  async update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  async put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  async delete(resource) {
    return Vue.axios.delete(resource);
  },
};

/* eslint dot-notation: 0 */
