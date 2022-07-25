<template>
  <div>
    <div v-if="isLoading" class="article-preview">Loading articles...</div>
    <div v-else>
      <div v-if="articles.length === 0" class="article-preview">
        No articles are here... yet.
      </div>
      <RwvArticlePreview
        v-for="(article, index) in articles"
        :article="article"
        :key="`${article.title}${index}`"
      />

      <!--
        // ====================================================================
        // TODO: Review emitting events in the pattern of "update:myPropName"
        // https://v2.vuejs.org/v2/guide/components-custom-events?redirect=true#sync-Modifier
        // ====================================================================
      -->

      <RwvVPagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import RwvArticlePreview from '@/components/VArticlePreview.vue';
// eslint-disable-next-line import/extensions
import RwvVPagination from '@/components/VPagination.vue';

export default {
  name: 'rwv-article-list',

  components: {
    RwvArticlePreview,
    RwvVPagination,
  },

  props: {
    type: {
      type: String,
      default: 'all',
    },

    author: String,

    tag: String,

    favorites: String,

    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },

  data: () => ({
    currentPage: 1,
  }),

  computed: {
    ...mapGetters({
      articlesCount: 'home/articlesCount',

      articles: 'home/articles',

      isLoading: 'home/isLoading',
    }),

    listConfig() {
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage,
      };

      if (this.author) {
        filters.author = this.author;
      }

      if (this.tag) {
        filters.tag = this.tag;
      }

      if (this.favorites) {
        filters.favorites = this.favorites;
      }

      return {
        type: this.type,
        filters,
      };
    },

    pages() {
      let pages = [];

      if (this.isLoading || this.articlesCount <= this.itemsPerPage) {
        return pages;
      }

      pages = [
        ...Array(Math.ceil(this.articlesCount / this.itemsPerPage)).keys(),
      ].map((e) => e + 1);

      return pages;
    },
  },

  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchArticles();
    },

    type() {
      this.resetPagination();
      this.fetchArticles();
    },

    author() {
      this.resetPagination();
      this.fetchArticles();
    },

    tag() {
      this.resetPagination();
      this.fetchArticles();
    },

    favorites() {
      this.resetPagination();
      this.fetchArticles();
    },
  },

  created() {
    this.fetchArticles();
  },

  methods: {
    fetchArticles() {
      this.$store.dispatch('home/fetchArticles', this.listConfig);
    },

    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    },
  },
};
</script>
