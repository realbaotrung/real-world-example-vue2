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

  async query(resource, params) {
    try {
      return Vue.axios.get(resource, params);
    } catch (error) {
      throw new Error(`[RMV] ApiService ${error}`);
    }
  },

  async get(resource, slug = '') {
    try {
      return Vue.axios.get(`${resource}/${slug}`);
    } catch (error) {
      throw new Error(`[RMV] ApiService ${error}`);
    }
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
    try {
      return Vue.axios.delete(resource);
    } catch (error) {
      throw new Error(`[RMV] ApiService ${error}`);
    }
  },
};

/* eslint dot-notation: 0 */
