import Vue      from 'vue'
import App      from './App.vue'
import router   from './router'
import store    from './store'
import axios    from 'axios'
import VueAxios from 'vue-axios'
import VueI18n  from 'vue-i18n'

// Import component
import Loading        from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
//這是裡是觸發 alert 用的
//直接把$bus 掛載在vue的原型下
import './bus'
import currencyFilter from './filters/currency'
//驗證套件
import VeeValidate    from 'vee-validate'
import zhTW           from 'vee-validate/dist/locale/zh_TW'
//時間格式套件
import moment         from 'moment'
// Vue.use(require('vue-moment'));

Vue.use(VueI18n)
Vue.use(VueAxios, axios)
Vue.filter('currency', currencyFilter)
Vue.config.productionTip       = false
axios.defaults.withCredentials = true

window.moment = moment

Vue.component('Loading', Loading)
//多語系
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


/* 驗證 登入 */
router.beforeEach((to, from, next) => {
  // 驗證登入API 位址
  const checkApi = `${process.env.VUE_APP_API}/api/user/check`
  //判斷是否允許
  if (to.meta.requiresAuth) {
    axios.post(checkApi)
      .then((response) => {
         (response.data.success) ? next() : next({ path: '/login' })
      })
      .catch((error) => {console.log(error)})
  } else {
     next()
  }
})



