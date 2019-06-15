import Vue    from 'vue'
import Router from 'vue-router'

Vue.use(Router);

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
          meta     : {requiresAuth: true},
        }
      ]
    },
  ]
})
