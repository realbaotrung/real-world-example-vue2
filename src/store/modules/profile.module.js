import {ApiService} from '@/services';

export default {
  namespaced: true,

  state: {
    errors: {},
    profile: {},
  },

  getters: {
    profile(state) {
      return state.profile;
    },
  },

  mutations: {
    SET_PROFILE(state, payload) {
      state.profile = payload;
      state.errors = {};
    },
  },

  actions: {
    async fetchProfileFollow({commit}, payload) {
      try {
        const {data} = ApiService.post(`profiles/${payload}/follow`);

        commit('SET_PROFILE', data.profile);
      } catch (error) {
        throw new Error(error);
      }
    },

    async fetchProfileUnFollow({commit}, payload) {
      try {
        const {data} = ApiService.delete(`profiles/${payload}/follow`);

        commit('SET_PROFILE', data.profile);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
