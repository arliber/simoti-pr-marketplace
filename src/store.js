import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
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
    personalOpportunities(state) {
      return state.opportunities.filter(opportunity => opportunity.userId === state.user.email);
    },
    marketOpportunities(state) {
      return state.opportunities.filter(opportunity => opportunity.userId !== state.user.email);
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
    ADD_PROPOSAL(state, payload) {
      state.opportunities
        .find(opportunity => opportunity._id === payload.opportunityId)
        .proposals.push({
          userId: state.user.email,
          proposalInfo: payload.proposalInfo,
        });
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
    addPropositionProposal({ commit, state }, payload) {
      const data = {
        proposalInfo: payload.proposalInfo,
      };
      return axios.post(`/api/opportunities/${payload.opportunityId}/proposals`, data, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      }).then(() => {
        commit('ADD_PROPOSAL', payload);
      });
    },
  },
});
