<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <a href="#" class="comment-author">
        <img :src="comment.author.image" alt="" class="comment-author-img" />
      </a>
      <router-link
        class="comment-author"
        :to="{name: 'profile', params: {username: comment.author.username}}"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ comment.createdAt | date }}</span>
      <span v-if="isCurrentUser" class="mod-options">
        <i class="ion-trash-a" @click="destroy(slug, comment.id)"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'rwv-comment',

  props: {
    slug: {
      type: String,
      required: true,
    },

    comment: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),

    isCurrentUser() {
      if (this.currentUser.username && this.article.author.username) {
        return this.currentUser.username === this.article.author.username;
      }
      return false;
    },
  },

  methods: {
    destroy(slug, commentId) {
      this.$store.dispatch('article/commentDestroy', {slug, commentId});
    },
  },
};

/*
eslint
  vuejs-accessibility/anchor-has-content:0,
  vuejs-accessibility/click-events-have-key-events:0
*/
</script>
