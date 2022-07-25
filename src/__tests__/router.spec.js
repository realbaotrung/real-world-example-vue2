/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {mount, createLocalVue, shallowMount} from '@vue/test-utils';
import {routes} from '../router';
import {createRouter} from './router/router';

import RwvHome from '../views/Home.vue';
import RwvTag from '../components/VTag.vue';

const createStore = (initialState = {}) =>
  new Vuex.Store({
    state: {
      authenticated: false,
      posts: [],
      ...initialState,
    },
    mutations: {
      ADD_POSTS(state, posts) {
        state.posts = [...state.posts, ...posts];
      },

      SET_AUTH(state, authenticated) {
        state.authenticated = authenticated;
      },
    },
  });

const authModule = {
  getters: {
    isAuthenticated: () => true,
  },
};

const homeModule = {
  getters: {
    tags: () => [1, 2, 3],
  },
};

describe('Home.vue', () => {
  // Create Local Vue

  const createWrapper = (component, options = {}, storeState = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);

    // Create Store and Router
    // const store = createStore();
    const store = new Vuex.Store({
      modules: {
        auth: authModule,
        home: homeModule,
      },
    });
    store.dispatch = jest.fn();

    const router = createRouter();

    return mount(component, {
      store,
      router,
      localVue,
      ...options,
    });
  };

  it('renders a message if passed', () => {
    const wrapper = createWrapper(RwvHome, {
      stubs: {
        RwvTag: '<p>this is RwvTag</p>',
      },
    });

    console.log(wrapper.html());

    // expect(wrapper.find('[data-testid="message"]').text()).toContain(message);

    // expect(wrapper.find('#message').text()).toBe(message);
  });

  // it('renders posts', async () => {

  //   const wrapper = createWrapper(
  //     Posts,
  //     {},
  //     {
  //       posts: [{id: 1, title: 'Post'}],
  //     },
  //   );

  //   expect(wrapper.findAll('[data-testid="post"]').length).toBe(1);
  //   expect(wrapper.findAll('[data-testid="post"]').at(0).text()).toContain("Post");
  // });
  // it('renders posts', async () => {
  // const message = 'New content coming soon!';

  // const wrapper = createWrapper(Posts, {propsData: {message}});
  // wrapper.vm.$store.commit('ADD_POSTS', [{id: 1, title: 'Post'}]);
  // await wrapper.vm.$nextTick();
  // expect(wrapper.findAll('[data-testid="post"]').length).toBe(1);
  // });
});
