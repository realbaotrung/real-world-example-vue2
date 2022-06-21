import {TagsService} from '@/services';

export default {
  namespaced: true,

  state: {
    tags: [],

    articles: [],

    isLoading: true,

    articlesCount: 0,
  },

  getters: {
    tags(state) {
      return state.tags;
    },

    articles(state) {
      return state.articles;
    },

    isLoading(state) {
      return state.isLoading;
    },

    articlesCount(state) {
      return state.articlesCount;
    },
  },

  mutations: {
    FETCH_END(state, payload) {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
      state.isLoading = false;
    },

    SET_TAGS(state, tags) {
      state.tags = tags;
    },
  },

  actions: {
    async fetchTags({commit}) {
      try {
        const res = await TagsService.get();
        commit('SET_TAGS', res.data.tags);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
