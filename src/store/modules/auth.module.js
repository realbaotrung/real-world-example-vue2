import {getItemFromLS, storageItem} from '@/utils/storage.utils';

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

  mutations: {},

  actions: {},
};
