import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userService from '../services/utilisateur'

let tokens = localStorage.getItem('token') || null;

console.log(tokens)

export default new Vuex.Store({
  state: {
    token : tokens,
    PrestataireLog: tokens === null,
  },
  getters: {
  },
  mutations: {
    setLoggedIn(state, value) {
      state.PrestataireLog = value;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token); // Enregistrez le token dans le stockage local
    }
  },
  actions: {
    async loginUser({ commit }, data) {
      console.log(data);
      try {
        let response = await userService.Login(data);
        console.log(response.error)
        if (!response.error) {
          commit('setToken', response);
          commit('setLoggedIn', true);

        } else {
          console.log("Connexion impossible");
          console.log(response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },logout({ commit }) {
      commit('setToken', null);
      commit('setLoggedIn', false);

      localStorage.removeItem('token');
    },
  },
  modules: {
  }
})
