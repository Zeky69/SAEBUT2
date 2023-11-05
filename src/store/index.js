import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import CarteService from '../services/carte.service'
import PrestaService from '../services/prestataire.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    transactionsAccount: [],
    accountAmount: 0,
    viruses: [],
    shopUser: null,
  }),
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    updateViruses(state, viruses) {
      state.viruses = viruses
    },
    updateShopUser(state, user) {
      state.shopUser = user
    },
    updateAccountAmount(state, amount) {
      state.accountAmount = amount
    },
    updateTransactions(state, transactions) {
        state.transactionsAccount = transactions
    }
  },
  // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
  actions: {
    async shopLogin({commit}, data) {
      console.log('login');
      let response = await ShopService.shopLogin(data)
      if (response.error === 0) {
        commit('updateShopUser', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAllViruses({commit}) {
      console.log('récupération des viruses');
      let response = await ShopService.getAllViruses()
      if (response.error === 0) {
        commit('updateViruses', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAccountAmount({commit}, number) {
      console.log("reset info");
      commit('updateAccountAmount', 0)
      commit('updateTransactions', [])
      console.log('récupération du montant du compte');
      let response = await BankService.getAccountAmount(number)
      if (response.error === 0) {
        commit('updateAccountAmount', response.data)
        console.log(response.data)

      }
      else {
        console.log(response.data)
      }
    },
    async getTransactionsofAccount({commit}, number) {
        console.log("reset info");
        commit('updateAccountAmount', 0)
        commit('updateTransactions', [])
        console.log('récupération des transactions du compte');
        let response = await BankService.getTransactionsofAccount(number)
        if (response.error === 0) {
            commit('updateTransactions', response.data)
            console.log(response.data)
        }
        else {
            console.log(response.data)
        }
    }
  }
})
