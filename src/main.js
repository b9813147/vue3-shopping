import Vue      from 'vue'
import App      from './App.vue'
import router   from './router'
import store    from './store'
import axios    from 'axios'
import VueAxios from 'vue-axios'
// Import component
import Loading  from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
//這是裡是觸發 alert 用的
//直接把$bus 掛載在vue的原型下
import './bus';

Vue.use(VueAxios, axios);
Vue.config.productionTip       = false;
axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);

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



