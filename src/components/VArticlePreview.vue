<template>
  <div class="article-preview">
    <RwvArticleMeta haveAction :article="article" />
    <router-link :to="articleLink" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <RwvTagList :tags="article.tagList" />
    </router-link>
  </div>
</template>

<script>
import RwvArticleMeta from './ArticleMeta.vue';
import RwvTagList from './TagList.vue';

export default {
  name: 'rwv-article-preview',

  components: {
    RwvArticleMeta,
    RwvTagList,
  },

  props: {
    article: {
      type: Object,
      required: true,
    },
  },

  computed: {
    articleLink() {
      return {
        name: 'article',
        params: {slug: this.article.slug},
      };
    },
  },
};
</script>
