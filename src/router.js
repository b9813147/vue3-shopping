import Vue    from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode  : 'history',
  base  : process.env.BASE_URL,
  routes: [
    {
      path    : '*',
      redirect: 'login'
    },
    {
      path     : '/login',
      name     : 'login',
      component: () => import('./components/app/Login')
    },
    //需登入才可以瀏覽
    {
      path     : '/admin',
      name     : 'dashboard',
      component: () => import('./views/dashboard'),
      children : [
        {
          path     : 'products',
          name     : 'products',
          // component: Products,
          component: () => import ('./components/dashboard/Products'),
          meta     : { requiresAuth: true },
        },
        {
          path     : 'Orders',
          name     : 'Orders',
          component: () => import('./components/dashboard/Orders'),
          meta     : { requiresAuth: true },
        },
        {
          path     : 'coupons',
          name     : 'coupons',
          component: () => import ('./components/dashboard/Coupons'),
          meta     : { requiresAuth: true }
        }
      ]
    },
    //無須登入即可瀏覽
    {
      path     : '/',
      name     : 'dashboard',
      component: () => import('./views/dashboard'),
      children : [
        {
          path     : 'custom_order',
          name     : 'custom_order',
          component: () => import('./components/dashboard/CustomOrder'),
        }
      ],

    }
  ]
})
