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
    opportunities: [],
  },
  getters: {
    isUserLoggedin(state) {
      return Object.keys(state.user).length > 0;
    },
    user(state) {
      return state.user;
    },
    opportunities(state) {
      return state.opportunities;
    },
  },
  mutations: {
    SET_USER(state, userData) {
      state.user = userData;
    },
    UNSET_USER(state) {
      state.user = {};
    },
    SET_OPPORTUNITIES(state, opportunities) {
      state.opportunities = opportunities;
    },
    ADD_OPPORTUNITY(state, opportunity) {
      state.opportunities.push(opportunity);
    },
  },
  actions: {
    setUser({ commit }, userData) {
      commit('SET_USER', userData);
    },
    unsetUser({ commit }) {
      commit('UNSET_USER');
    },
    setOpportunities({ commit }, opportunities) {
      commit('SET_OPPORTUNITIES', opportunities);
    },
    addOpportunity({ commit }, opportunity) {
      commit('ADD_OPPORTUNITY', opportunity);
    },
  },
});
