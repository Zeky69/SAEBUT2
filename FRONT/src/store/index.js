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
    user_id : null,
    email : '',
    fname : '',
    lname : '',
    group_id: 3,
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
    },
    setUserInformation(state, information){
      state.user_id = information.id;
      state.email = information.email;
      state.fname = information.fname;
      state.lname = information.lname;
      state.group_id = information.group_id;
    },
    setDefaultValue(state){
          state.user_id = null;
          state.email = '';
          state.fname = '';
          state.lname = '';
          state.group_id= 3;
    }
  },
  actions: {
    async loginUser({commit}, data) {
      console.log(data);
      try {
        let response = await userService.Login(data);
        if (!response.error) {
          commit('setToken', response.token);
          commit('setUserInformation', response);
          commit('setLoggedIn', true);

        } else {
          console.log("Connexion impossible");
          console.log(response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },

    async getInformationFromToken({commit}, data) {
      try {
        let response = await userService.getInformationFromToken(data)
        if (!response.error) {
          commit('setUserInformation', response)
        } else {
          console.log("Erreur lors de la récupération des informations à partir du token");
          commit('setToken', null);
          commit('setLoggedIn', false);
          commit('setDefaultValue');
          localStorage.removeItem('token');
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },

    logout({commit}) {
      commit('setToken', null);
      commit('setLoggedIn', false);
      commit('setDefaultValue');
      localStorage.removeItem('token');
    },
  },
  modules: {
  }
})
