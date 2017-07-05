import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Sellers from '@/components/sellers/sellers'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/good',
      component: Goods
    },
    {
      path: '/rating',
      component: Ratings
    },
    {
      path: '/seller',
      component: Sellers
    }
  ]
})
