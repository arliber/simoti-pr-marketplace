import axios from 'axios';
import router from '../router/index';
import store from '../store';

const API_URL = '/api';
const LOGIN_URL = `${API_URL}/signin`;
const SIGNUP_URL = `${API_URL}/signup`;

export default {

  setAxiosHeader() {
    axios.defaults.headers.common.Authorization = `Bearer ${store.getters.user.token}`;
  },

  clearAxiosHeader() {
    axios.defaults.headers.common.Authorization = '';
  },

  login(context, creds, redirect) {
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
  },

  signup(context, creds, redirect) {
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
  },

  logout() {
    store.dispatch('unsetUser');
    this.clearAxiosHeader();
  },

};
