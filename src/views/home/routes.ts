export default {
  path: '/',
  component: {
    template: '<router-view />',
  },
  children: [
    {
      path: '',
      name: 'home',
      meta: {
        title: 'home',
      },
      component: () => import('./home.vue'),
    },
  ],
}
