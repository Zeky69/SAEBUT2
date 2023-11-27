import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import userService from '../services/utilisateur'

export default new Vuex.Store({
  state: {
    users : []
  },
  getters: {
  },
  mutations: {
    updateUser(state, user){
      state.users = user;
    }
  },
  actions: {
    async loginUser({ commit }, data) {
      console.log(data);
      try {
        let response = await userService.Login(data);
        if (response.status === 200) {
          console.log(response)
          commit('updateUser', response.data);
        } else {
          console.log("Connexion impossible");
          console.log(response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  },
  modules: {
  }
})
