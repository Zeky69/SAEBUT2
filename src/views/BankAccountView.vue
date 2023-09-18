<template>
  <div>
    <h1>idaccount</h1>

    <span>idaccount : </span><input v-model="idaccount">
    <button @click="getAccountAmount(idaccount)">show amount</button>
    <button @click="getTransactionsofAccount(idaccount)">show transactions</button>
    <p v-if="accountAmount">Amount : {{ accountAmount }}</p>

    <!-- Utilisez v-if pour vérifier si accountTransactions existe -->
    <div v-if="transactionsAccount.length != 0">
      <p>Transactions :</p>
      <ul>
        <!-- Utilisez v-for pour parcourir la liste des transactions -->
        <li v-for="(transaction, index) in transactionsAccount" :key="index">
          <!-- Accédez aux propriétés de chaque transaction -->
          Transaction {{ index + 1 }} :
          Montant : <span :style="{ color: transaction.amount >= 0 ? 'green' : 'red' }">{{ transaction.amount }}</span>
          <br>
          Date : {{ formatDate(transaction.date["$date"]) }}
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BankAccountView',
  data: () => ({
    idaccount: '',
  }),
  computed: {
    ...mapState(['accountAmount', 'transactionsAccount']),
  },
  methods: {
    ...mapActions(['getAccountAmount', 'getTransactionsofAccount']),
    formatDate(dateString) {
      // Vous pouvez personnaliser le format de date ici, par exemple, en utilisant Intl.DateTimeFormat
      const options = { year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>
