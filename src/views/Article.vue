<template>
  <div class="article-page">Hello from article-page</div>
</template>

<script>
import store from '@/store';

export default {
  name: 'rwv-article',

 // TODO:  development next
  // components: {
  //   RwvArticleMeta,
  //   RwvComment,
  //   RwvCommentEditor,
  //   RwvTag,
  // },

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  // TODO: review fetching Before navigation
  // https://v3.router.vuejs.org/guide/advanced/data-fetching.html#fetching-before-navigation
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch('article/fetchArticle', to.params.slug),
      store.dispatch('article/fetchComments', to.params.slug),
    ]).then(() => {
      next();
    });
  },
};
</script>
