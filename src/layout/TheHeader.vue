<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'home'}">
        conduit
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <!-- router-link render as <li> tag with prop " tag='li' " -->
        <router-link
          tag="li"
          class="nav-item nav-link nav-link-cursor"
          active-class="active"
          exact
          :to="{name: 'home'}"
        >
          Home
        </router-link>
        <router-link
          tag="li"
          class="nav-item nav-link nav-link-cursor"
          active-class="active"
          exact
          :to="{name: 'login'}"
        >
          <i class="ion-compose"></i>Sign in
        </router-link>
        <router-link
          tag="li"
          class="nav-item nav-link nav-link-cursor"
          active-class="active"
          exact
          :to="{name: 'register'}"
        >
          <i class="ion-compose"></i>Sign up
        </router-link>
      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <router-link
          tag="li"
          class="nav-item nav-link nav-link-cursor"
          active-class="active"
          exact
          :to="{name: 'home'}"
        >
          Home
        </router-link>
        <router-link
          tag="li"
          class="nav-item nav-link nav-link-cursor"
          active-class="active"
          :to="{name: 'article-edit'}"
        >
          <i class="ion-compose"></i>&nbsp;New Article
        </router-link>
        <router-link
          tag="li"
          class="nav-item nav-link nav-link-cursor"
          active-class="active"
          exact
          :to="{name: 'settings'}"
        >
          <i class="ion-gear-a"></i>&nbsp;Settings
        </router-link>
        <router-link
          tag="li"
          class="nav-item nav-link nav-link-cursor"
          v-if="currentUser.username"
          active-class="active"
          exact
          :to="{
            name: 'profile',
            params: {username: currentUser.username},
          }"
        >
          {{ currentUser.username }}
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'rwv-the-header',

  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',

      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
};
</script>

<style scoped lang="scss">
.nav-link-cursor {
  cursor: pointer;
}
</style>
