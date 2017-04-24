import axios from 'axios';
import router from '../router/index';
import store from '../store';

const API_URL = '/api';
const LOGIN_URL = `${API_URL}/signin`;
const SIGNUP_URL = `${API_URL}/signup`;

class Auth {

  static setAxiosHeader() {
    axios.defaults.headers.common.Authorization = `Bearer ${store.getters.user.token}`;
  }

  static clearAxiosHeader() {
    axios.defaults.headers.common.Authorization = '';
  }

  static login(context, creds, redirect) {
    axios.post(LOGIN_URL, creds)
      .then((result) => {
        store.dispatch('setUser', result.data);
        this.setAxiosHeader();
        if (redirect) {
          router.push(redirect);
        }
      }).catch((err) => {
        context.error = err; // TODO: Report error back
      });
  }

  static signup(context, creds, redirect) {
    axios.post(SIGNUP_URL, creds)
      .then((result) => {
        store.dispatch('setUser', result.data);
        if (redirect) {
          router.push(redirect);
        }
      })
      .catch((err) => {
        context.error = err; // TODO: Report error back
      });
  }

  static logout(redirect) {
    store.dispatch('unsetUser');
    this.clearAxiosHeader();
    if (redirect) {
      router.push(redirect);
    }
  }

}

// Waiting for response @ https://github.com/robinvdvleuten/vuex-persistedstate/issues/20
/* store.subscribe((mutation) => {
  if (mutation.type === 'SET_USER') {
    Auth.setAxiosHeader();
  } else if (mutation.type === 'UNSET_USER') {
    Auth.clearAxiosHeader();
  }
});*/

export default Auth;
