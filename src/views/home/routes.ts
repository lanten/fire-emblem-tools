export default {
  path: '/',
  component: {
    template: '<router-view />',
  },
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('./home.vue'),
    },
    {
      path: 'get-data',
      name: 'get-data',
      component: () => import('./get-data.vue'),
    },
  ],
}
