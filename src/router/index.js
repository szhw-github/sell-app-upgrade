import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: {
          name: 'goods'
        }
      },
      {
        path: '/goods',
        component: () => import('components/goods/Goods')
      },
      {
        path: '/seller',
        component: () => import('components/seller/Seller')
      },
      {
        path: '/ratings',
        component: () => import('components/ratings/Ratings')
      }
    ]
  })
}
