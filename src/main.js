import Vue      from 'vue'
import App      from './App.vue'
import router   from './router'
import store    from './store'
import axios    from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';


Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const checkApi = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(checkApi).then((response) => {
      // console.log(response.data.success, response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login'
        });
      }
    }).catch((error) => {

    });
  } else {
    next();
  }
});



