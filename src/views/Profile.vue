<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img alt="profile image" :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div v-if="isCurrentUser">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
            <div v-else>
              <button
                class="btn btn-sm btn-secondary action-btn"
                v-if="profile.following"
                @click.prevent="unFollow()"
              >
                <i class="ion-plus-round"></i> &nbsp;UnFollow
                {{ profile.username }}
              </button>
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                v-if="!profile.following"
                @click.prevent="follow()"
              >
                <i class="ion-plus-round"></i> &nbsp;Follow
                {{ profile.username }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'profile' }"
                >
                  My Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'profile-favorites' }"
                >
                  Favorited Articles
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'rwv-profile',

  created() {
    this.$store.dispatch('profile/fetchProfile', this.$route.params.username); // @:username
  },

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      profile: 'profile/profile',
      isAuthenticated: 'auth/isAuthenticated',
    }),

    isCurrentUser() {
      if (this.currentUser.username && this.article.author.username) {
        return this.currentUser.username === this.article.author.username;
      }
      return false;
    },
  },

  methods: {
    follow() {
      if (!this.isAuthenticated) return;
      this.$store.dispatch('profile/fetchProfileFollow', this.$route.params.username); // @:username
    },

    unFollow() {
      this.$store.dispatch('profile/fetchProfileUnFollow', this.$route.params.username);
    },
  },

  watch: {
    // TODO: see $route Object
    // https://v3.router.vuejs.org/api/#route-object-properties
    $route(to) {
      this.$store.dispatch('profile/fetchProfile', to.params.username); // @:username
    },
  },
};
</script>
