<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="updateSettings()">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model.lazy="user.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model.lazy="user.username"
                  placeholder="Your username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model.lazy="user.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model.lazy="user.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model.lazy="user.password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <!-- Line break for logout button -->
          <hr />
          <button @click="logout" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rwv-settings',

  data() {
    return {
      user: {
        email: '',
        username: '',
        password: '',
        image: '',
        bio: '',
      },
    };
  },

  watch: {
    'user.email': {
      handler(input) {
        console.log('email', input);
      },
    },
    'user.username': {
      handler(input) {
        console.log('username', input);
      },
    },
    'user.password': {
      handler(input) {
        console.log('password', input);
      },
    },
    'user.image': {
      handler(input) {
        console.log('image', input);
      },
    },
    'user.bio': {
      handler(input) {
        console.log('bio', input);
      },
    },
  },

  mounted() {
    this.user = {...this.getCurrentUser()};
  },

  methods: {
    getCurrentUser() {
      return this.$store.getters['auth/currentUser'];
    },

    async updateSettings() {
      try {
        await this.$store.dispatch('auth/updateUser', this.user);

        this.$router.push({name: 'home'});

        return true;
      } catch (error) {
        return false;
      }
    },

    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.push({name: 'home'});

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
</script>
