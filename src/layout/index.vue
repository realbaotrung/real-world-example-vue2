<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './TheHeader.vue';
import AppFooter from './TheFooter.vue';

export default {
  name: 'AppLayout',
  components: {AppHeader, AppFooter},
};
</script>
