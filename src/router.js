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
      component: () => import('./components/pages/Login')
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
          component: () => import ('./components/pages/Products'),
          meta     : {requiresAuth: true},
        }
      ]
    },
    {
      path     : '/about',
      name     : 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
