/**
 * 404 错误页面
 * @Date: 2019-07-19 16:24:30
 */

export default [
  {
    path: '*',
    name: '404',
    meta: {
      title: 'Type Error',
    },
    component: () => import('./404.vue'),
  },
]
