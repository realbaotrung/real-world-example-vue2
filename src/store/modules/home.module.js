import {ArticlesService, TagsService} from '@/services';

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
    FETCH_START(state) {
      state.isLoading = true;
    },

    FETCH_END(state, payload) {
      state.articles = payload.articles;
      state.articlesCount = payload.articlesCount;
      state.isLoading = false;
    },

    SET_TAGS(state, payload) {
      state.tags = payload;
    },

    UPDATE_ARTICLE_IN_LIST(state, payload) {
      state.articles = state.articles.map((article) => {
        if (article.slug !== payload.slug) {
          return article;
        }
        // TODO: review the state change
        // We could just return data, but it seems dangerous to
        // mix the results of different api calls, so we
        // protect ourselves by copying the information.
        article.favorited = payload.favorited;
        article.favoritedCount = payload.favoritedCount;

        return article;
      });
    },
  },

  actions: {
    async fetchArticles({commit}, payload) {
      try {
        commit('FETCH_START');

        const {data} = await ArticlesService.query(
          payload.type,
          payload.filters,
        );

        commit('FETCH_END', data);

        return;
      } catch (error) {
        throw new Error(error);
      }
    },

    async fetchTags({commit}) {
      try {
        const {data} = await TagsService.get();

        commit('SET_TAGS', data.tags);

        return;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
