import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [persistedState({
    paths: ['user'],
  })],
  state: {
    user: { },
  },
  getters: {
    isUserLoggedin(state) {
      return Object.keys(state.user).length > 0;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_USER(state, userData) {
      state.user = userData;
    },
    UNSET_USER(state) {
      state.user = {};
    },
  },
  actions: {
    setUser({ commit }, userData) {
      commit('SET_USER', userData);
    },
    unsetUser({ commit }) {
      commit('UNSET_USER');
    },
  },
});
