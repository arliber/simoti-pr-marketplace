// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import locale from 'element-ui/lib/locale/lang/en';
/* import 'element-ui/lib/theme-default/index.css';*/
import ElementUI from 'element-ui';
import axios from 'axios';
import Vue from 'vue';
import './assets/element-simoti/index.css';
import App from './App';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App),
  mounted() {
    axios.interceptors.response.use(response => response, (err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        this.$router.push('/login');
      }
      return Promise.reject(err);
    });
  },
});
