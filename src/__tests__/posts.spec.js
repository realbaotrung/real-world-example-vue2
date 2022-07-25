/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {mount, createLocalVue, shallowMount} from '@vue/test-utils';

import Posts from './components/Posts.vue';
import {createRouter} from './router/router';
import {createStore} from './store/store';

describe('Posts.vue', () => {
  // Create Local Vue

  const createWrapper = (component, options = {}, storeState = {}) => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);

    // Create Store and Router
    const store = createStore(storeState);
    const router = createRouter();

    return mount(component, {
      store,
      router,
      localVue,
      ...options,
    });
  };

  it('renders a message if passed', () => {
    const message = 'New content coming soon!';

    const wrapper = createWrapper(Posts, {propsData: {message}});

    console.log(wrapper.html());

    expect(wrapper.find('[data-testid="message"]').text()).toContain(message);

    expect(wrapper.find('#message').text()).toBe(message);
  });

  it('renders posts', async () => {
    const wrapper = createWrapper(
      Posts,
      {},
      {
        posts: [{id: 1, title: 'Post'}],
      },
    );

    expect(wrapper.findAll('[data-testid="post"]').length).toBe(1);
    expect(wrapper.findAll('[data-testid="post"]').at(0).text()).toContain(
      'Post',
    );
  });
  // it('renders posts', async () => {
  // const message = 'New content coming soon!';

  // const wrapper = createWrapper(Posts, {propsData: {message}});
  // wrapper.vm.$store.commit('ADD_POSTS', [{id: 1, title: 'Post'}]);
  // await wrapper.vm.$nextTick();
  // expect(wrapper.findAll('[data-testid="post"]').length).toBe(1);
  // });
});
