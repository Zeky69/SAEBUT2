import { items, shopusers } from './data'
import {v4 as uuidv4} from 'uuid'
import { bankaccounts} from './data'
import { transactions} from './data'

/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer aurpès de la boutique


 */

function shopLogin(data) {
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  let user = shopusers.find(e => e.login === data.login)
  if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'}
  // générer un uid pour l'utilisateur si non existant
  if (!user.uuid) {
    user.uuid = uuidv4()
  }
  return {error: 0, status: 200, data: user}
}

function getAllViruses() {
  return {error: 0, data: items}
}


function getAccountAmount(number) {
  if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte fourni'}
  let account = bankaccounts.find(e => e.number === number)
  if (!account) return {error: 1, status: 404, data: 'compte inconnu'}
  return {error: 0, data: account.amount}
}

function getTransactionsofAccount(number) {
    let transactionsList = [];
    if (!number) return { error: 1, status: 404, data: 'Aucun numéro de compte fourni' }

    let account = bankaccounts.find(e => e.number === number);
    console.log(account);
    if (!account) return { error: 1, status: 404, data: 'Compte inconnu' }

    transactionsList = transactions.filter(e => e.account === account._id);
    if (!transactionsList || transactionsList.length === 0) {
        return { error: 1, status: 404, data: 'Aucune transaction pour ce compte' };
    }

    const simplifiedTransactions = transactionsList.map(transaction => ({
        amount: transaction.amount,
        date: transaction.date
    }));
    return { error: 0, data: simplifiedTransactions };
}



export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getTransactionsofAccount,
}