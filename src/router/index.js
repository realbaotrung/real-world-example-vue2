import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeGlobal.vue'),
      },
      {
        path: 'my-feed',
        name: 'home-my-feed',
        component: () => import('@/views/HomeMyFeed.vue'),
      },
      {
        path: 'tag/:tag',
        name: 'home-tag',
        component: () => import('@/views/HomeTag.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue'),
  },
  // Handle child routes with a default, by giving the name to the child
  // SO: https://github.com/vuejs/vue-router/issues/777
  {
    path: '/@:username',
    component: () => import('@/views/Profile.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('@/views/ProfileArticles.vue'),
      },
      {
        path: 'profile-favorites',
        name: 'favorites',
        component: () => import('@/views/ProfileFavorites.vue'),
      },
    ],
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: () => import('@/views/Article.vue'),
    props: true,
  },
  {
    path: '/editor/:slug?', // slug is optional
    name: 'article-edit',
    component: () => import('@/views/ArticleEdit.vue'),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
