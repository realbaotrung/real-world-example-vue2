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

    errorsMessage(state) {
      return state.errors;
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
    async login({commit}, payload) {
      try {
        const {data} = await ApiService.post('users/login', {user: payload});

        setItemToLS(storageItem.ID_TOKEN_KEY, data.user.token);

        commit('SET_AUTH', data.user);

        return;
      } catch (error) {
        // TODO: see error handling
        commit('SET_ERROR', error.response.data.errors);
        throw new Error(error);
      }
    },

    async logout({commit}) {
      commit('PURGE_AUTH');
    },

    async register({commit}, payload) {
      try {
        const {data} = await ApiService.post('users', {user: payload});

        commit('SET_AUTH', data.user);

        return;
      } catch (error) {
        commit('SET_ERROR', error.response.data.errors);
        throw new Error(error);
      }
    },

    async checkAuth({commit}) {
      if (!getItemFromLS(storageItem.ID_TOKEN_KEY)) {
        // commit('PURGE_AUTH');
        return;
      }
      try {
        ApiService.setHeader();

        const {data} = await ApiService.get('user');

        commit('SET_AUTH', data.user);
        return;
      } catch (error) {
        commit('SET_ERROR', error.response.data.errors);
        throw new Error(error);
      }
    },

    async updateUser({commit}, payload) {
      try {
        const {email, username, password, image, bio} = payload;

        const user = {
          email,
          username,
          password,
          image,
          bio,
        };

        if (password) {
          user.password = password;
        }

        const {data} = await ApiService.put('user', JSON.stringify(user));

        commit('SET_AUTH', data.user);

        return;
      } catch (error) {
        commit('SET_ERROR', error.response.data);
        throw new Error(error);
      }
    },
  },
};
