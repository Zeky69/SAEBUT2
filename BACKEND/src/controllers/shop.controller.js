// shop.controller

const sendEmail = require("../services/SendMail");
const shopService = require("../services/shop.service");
const userService = require("../services/utilisateur.service");

exports.getArticle = async (req, res) => {
  const id = req.params.id;

  try {
    const articles = await shopService.getArticle(id);

    if (!articles) {
      return res.status(404).send("Aucun article trouvé pour cette catégorie.");
    }

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Controller encountered an unexpected error: ", error);
    return res.status(500).send("Erreur lors de la récupération des articles");
  }
};

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await shopService.getAllArticles();

        if (!articles) {
        return res.status(404).send("Aucun article trouvé.");
        }

        return res.status(200).json(articles);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la récupération des articles");
    }
}

exports.getArticlesByPrestataire = async (req, res) => {
    const id = req.params.id;

    try {
        const articles = await shopService.getArticlesByPrestataire(id);

        if (!articles) {
        return res.status(404).send("Aucun article trouvé pour ce prestataire.");
        }

        return res.status(200).json(articles);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la récupération des articles");
    }
}

exports.getArticlesByCategorie = async (req, res) => {
    const id = req.params.id;

    try {
        const articles = await shopService.getArticlesByCategorie(id);

        if (!articles) {
        return res.status(404).send("Aucun article trouvé pour cette catégorie.");
        }

        return res.status(200).json(articles);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la récupération des articles");
    }
}

exports.createArticle = async (req, res) => {
    const article = req.body;

    try {
        const newArticle = await shopService.createArticle(article);

        if (!newArticle) {
        return res.status(404).send("Erreur lors de la création de l'article.");
        }

        return res.status(200).json(newArticle);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la création de l'article");
    }
}

exports.updateArticle = async (req, res) => {
    const id = req.params.id;
    const article = req.body;
    console.log("controller modif")
    console.log(article)
    console.log(id)

    try {
        const updatedArticle = await shopService.updateArticle(id, article);

        if (!updatedArticle) {
        return res.status(404).send("Erreur lors de la mise à jour de l'article.");
        }

        return res.status(200).json(updatedArticle);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la mise à jour de l'article");
    }
}

exports.deleteArticle = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedArticle = await shopService.deleteArticle(id);

        if (!deletedArticle) {
        return res.status(404).send("Erreur lors de la suppression de l'article.");
        }

        return res.status(200).json(deletedArticle);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la suppression de l'article");
    }
}

exports.getCommandes = async (req, res) => {
    try {
        const commandes = await shopService.getCommandes();

        if (!commandes) {
        return res.status(404).send("Aucune commande trouvée.");
        }

        return res.status(200).json(commandes);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la récupération des commandes");
    }
}

exports.getCommande = async (req, res) => {
    const id = req.params.id;

    try {
        const commande = await shopService.getCommande(id);

        if (!commande) {
        return res.status(404).send("Aucune commande trouvée.");
        }

        return res.status(200).json(commande);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la récupération des commandes");
    }
}

exports.updateCommandeLigne = async (req, res) => {
    const id = req.params.id;

    try {
        const commande = await shopService.updateCommandeLigne(id);

        if (!commande) {
        return res.status(404).send("Aucune commande trouvée.");
        }

        return res.status(200).json(commande);
    } catch (error) {
        console.error("Controller encountered an unexpected error: ", error);
        return res.status(500).send("Erreur lors de la récupération des commandes");
    }
}

exports.getRandomArticles = async (req, res) => {
  console.log("ici");

  try {
    const articles = await shopService.getRandomArticles();

    if (!articles) {
      return res.status(404).send("Aucun article trouvé.");
    }

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Controller encountered an unexpected error: ", error);
    return res.status(500).send("Erreur lors de la récupération des articles");
  }
};

exports.getCategorie = async (req, res) => {
  const id = req.params.id;

  try {
    const articles = await shopService.getCategorie(id);

    if (!articles) {
      return res.status(404).send("Aucunes catégories trouvés.");
    }

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Controller encountered an unexpected error: ", error);
    return res
      .status(500)
      .send("Erreur lors de la récupération des catégories");
  }
};

exports.getCategorieByProduct = async (req, res) => {
  const id_produit = req.params.id;

  try {
    const articles = await shopService.getCategorieByproduct(id_produit);

    if (!articles) {
      return res.status(404).send("Aucunes catégories trouvés.");
    }

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Controller encountered an unexpected error: ", error);
    return res
      .status(500)
      .send("Erreur lors de la récupération des catégories");
  }
};

exports.getAllCategorie = async (req, res) => {
  try {
    const articles = await shopService.getAllCategorie();

    if (!articles) {
      return res.status(404).send("Aucunes catégories trouvés.");
    }

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Controller encountered an unexpected error: ", error);
    return res
      .status(500)
      .send("Erreur lors de la récupération des catégories");
  }
};

exports.createCommandeWithoutAccount = async (req, res) => {
  const { panier, acheteur, billet } = req.body;

  try {
    console.log(panier);

    let emailContent = `Résumé de votre commande :\n\n`;
    let totalCommande = 0;

    panier.forEach((item) => {
      const totalItem = item.quantity * item.price;
      totalCommande += totalItem;

      if (item.date) {
        emailContent += `Billet: ${item.header.title}\n`;
        emailContent += `Type: ${item.header.subtitle}\n`;
        emailContent += `Description: ${item.header.description}\n`;
        emailContent += `Quantité: ${item.quantity}\n`;
        emailContent += `Prix par billet: ${item.price} €\n`;
        emailContent += `Date: ${item.date.join(", ")}\n`;
        emailContent += `Total pour cet article: ${totalItem} €\n\n`;
      } else {
        emailContent += `Article: ${item.header.title}\n`;
        emailContent += `Type: ${item.header.subtitle}\n`;
        emailContent += `Description: ${item.header.description}\n`;
        emailContent += `Quantité: ${item.quantity}\n`;
        emailContent += `Prix de l'article: ${item.price} €\n`;
        emailContent += `Total pour cet article: ${totalItem} €\n\n`;
      }
    });

    emailContent += `Total de la commande: ${totalCommande} €\n\n`;
    emailContent += `Informations de l'acheteur:\n`;
    emailContent += `Nom: ${acheteur.nom}\n`;
    emailContent += `Prénom: ${acheteur.prenom}\n`;
    emailContent += `Email: ${acheteur.email}\n`;
    emailContent += `Adresse: ${acheteur.adresse}\n`;
    emailContent += `Code postal: ${acheteur.codePostal}\n`;
    emailContent += `Ville: ${acheteur.ville}\n`;
    emailContent += `Pays: ${acheteur.pays}\n`;

    const id_user = await userService.registerGhostsUser(
      acheteur.nom,
      acheteur.prenom,
      acheteur.email
    );
    const id_commande = await shopService.setCommande(id_user);
    for (const element of panier) {
      if (element.header.type !== "billet") {
        await shopService.setCommandeLineArticle(
          id_commande,
          element.id,
          element.quantity
        );
      }
    }
    let billets = [];
    if (billet && billet.length > 0) {
      for (const element of billet) {
        let uuid = await shopService.setCommandeLineBillet(
          id_commande,
          element.item.id,
          element.item.subId,
          element.nom,
          element.prenom,
          { date: element.item.date }
        );
        billets.push({
          uuid: uuid,
          id: element.item.id,
          subId: element.item.subId,
          nom: element.nom,
          prenom: element.prenom,
          date: element.date,
        });
      }
    }
    console.log(acheteur.email);
    sendEmail.sendEmail(
      "Votre commande sur Belforaine au nom de " + acheteur.nom,
      acheteur.email,
      emailContent + "\n\n Cordialement Belforaine"
    );
    res.status(200).json(billets);
  } catch (error) {
    console.error("Controller encountered an unexpected error: ", error);
    return res.status(500).send("Erreur lors de la création de la commande");
  }
};
