import LocalSource from "@/datasource/controller";


async function getAccountAmountFromLocalSource(number) {
  // récupération auprès de la source locale
  return LocalSource.getAccountAmount(number)
}

async function getAccountAmount(number) {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await getAccountAmountFromLocalSource(number)
    }
    // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le montant du compte'  }
    }
    return response
}

async function getTransactionsofAccountFromLocalSource(number) {
    // récupération auprès de la source locale
    return LocalSource.getTransactionsofAccount(number)
}

async function getTransactionsofAccount(number) {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await getTransactionsofAccountFromLocalSource(number)
    }
    // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer les transactions du compte'  }
    }
    return response
}


export default {
    getAccountAmount,
    getTransactionsofAccount,
}