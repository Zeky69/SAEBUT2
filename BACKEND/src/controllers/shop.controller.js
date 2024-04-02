// shop.controller

const sendEmail = require("../services/SendMail");
const shopService = require("../services/shop.service");
const userService = require("../services/utilisateur.service");

exports.getArticles = async (req, res) => {
  const id = req.params.id;

  try {
    const articles = await shopService.getArticles(id);

    if (!articles) {
      return res.status(404).send("Aucun article trouvé pour cette catégorie.");
    }

    return res.status(200).json(articles);
  } catch (error) {
    console.error("Controller encountered an unexpected error: ", error);
    return res.status(500).send("Erreur lors de la récupération des articles");
  }
};

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
