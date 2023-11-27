import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userService from '../services/utilisateur'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    PrestataireLog: false,
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
        if (response.status === 200) {
          console.log(response)
          commit('setToken', response.data);
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
