<template>
  <div class="home-tag"><RwvArticleList :tag="tag" /></div>
</template>

<script>
import RwvArticleList from '@/components/ArticleList.vue';

export default {
  name: 'rwv-home-tag',

  components: {
    RwvArticleList,
  },

  computed: {
    tag() {
      return this.$route.params.tag;
    },
  },
};
</script>
