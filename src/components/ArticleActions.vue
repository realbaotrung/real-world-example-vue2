<template>
  <!-- Used when user is also author -->
  <span v-if="canModify">
    <router-link class="btn btn-sm btn-outline-secondary" :to="editArticleLink">
      <i class="ion-edit"></i> <span>&nbsp;Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i> <span>&nbsp;Delete Article</span>
    </button>
  </span>
  <!-- Used in ArticleView when not author -->
  <span v-else>
    <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
      <i class="ion-plus-round"></i> <span>&nbsp;</span>
      <span>{{ followUserLabel }}</span>
    </button>
    <span>&nbsp;&nbsp;</span>
    <button
      class="btn btn-sm"
      @click="toggleFavorite"
      :class="toggleFavoriteButtonClasses"
    >
      <i class="ion-heart"></i> <span>&nbsp;</span>
      <span>{{ favoriteArticleLabel }}</span>
      <span>&nbsp;</span>
      <span class="counter">{{ favoriteCounter }}</span>
    </button>
  </span>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'rwv-article-actions',

  props: {
    article: {
      type: Object,
      required: true,
    },

    canModify: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      profile: 'profile/profile',
      isAuthenticated: 'auth/isAuthenticated',
    }),

    editArticleLink() {
      return {name: 'article-edit', params: {slug: this.article.slug}};
    },

    toggleFavoriteButtonClasses() {
      return {
        'btn-primary': this.article.favorited,
        'btn-outline-primary': !this.article.favorited,
      };
    },

    followUserLabel() {
      const username = this.article.author.username;
      const followStatus = this.profile.following ? 'UnFollow' : 'Follow';
      return `${followStatus} ${username}`;
    },

    favoriteArticleLabel() {
      return this.article.favorited ? 'Unfavorite Article' : 'Favorite Article';
    },

    favoriteCounter() {
      return String(this.article.favoritesCount);
    },
  },

  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({name: 'login'});
        return;
      }

      const action = this.article.favorited
        ? 'article/favoriteAdd'
        : 'article/favoriteRemove';

      this.$store.dispatch(action, this.article.slug);
    },

    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({name: 'login'});
        return;
      }

      const action = this.article.following
        ? 'profile/fetchProfileUnFollow'
        : 'profile/fetchProfileFollow';

      this.$store.dispatch(action, this.profile.username);
    },

    async deleteArticle() {
      await this.$store.dispatch('article/articleDelete', this.article.slug);
      this.$router.push({name: 'home'});
    },
  },
};
</script>
