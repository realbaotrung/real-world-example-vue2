<template>
  <div class="profile-page">
    <RwvArticleList :favorites="favorites" :items-per-page="5" />
  </div>
</template>

<script>
import RwvArticleList from '@/components/ArticleList.vue';

export default {
  name: 'rwv-profile-favorites',

  components: {
    RwvArticleList
  },

  computed: {
    favorites() {
      return this.$route.params.username;
    }
  }
};
</script>
