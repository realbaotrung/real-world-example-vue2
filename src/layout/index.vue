<template>
  <div id="app">
    <RwvTheHeader />
    <router-view></router-view>
    <RwvTheFooter />
  </div>
</template>

<script>
import RwvTheHeader from './TheHeader.vue';
import RwvTheFooter from './TheFooter.vue';

export default {
  name: 'AppLayout',
  components: {RwvTheHeader, RwvTheFooter},
};
</script>
