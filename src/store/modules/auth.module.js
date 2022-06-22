import {ApiService} from '@/services';
import {
  getItemFromLS,
  removeItemFromLS,
  setItemToLS,
  storageItem,
} from '@/utils/storage.utils';

export default {
  namespaced: true,

  state: {
    errors: null,

    user: {},

    isAuthenticated: !!getItemFromLS(storageItem.ID_TOKEN_KEY),
  },

  getters: {
    currentUser(state) {
      return state.user;
    },

    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },

  mutations: {
    SET_ERROR(state, payload) {
      state.errors = payload;
    },

    SET_AUTH(state, payload) {
      state.isAuthenticated = true;
      state.user = payload;
      state.errors = {};
      setItemToLS(state.user.token);
    },

    PURGE_AUTH(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.errors = {};
      removeItemFromLS(storageItem.ID_TOKEN_KEY);
    },
  },

  actions: {
    async checkAuth({commit}) {
      if (!getItemFromLS(storageItem.ID_TOKEN_KEY)) {
        commit('PURGE_AUTH');
      } else {
        try {
          ApiService.setHeader();

          const { data } = await ApiService.get('user');

          commit('SET_AUTH', data.user);
        } catch (error) {
          commit('SET_ERROR', error.data.errors);
        }
      }
    },
  },
};
