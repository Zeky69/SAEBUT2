// shop.controller

const shopService = require('../services/shop.service')

exports.getArticles = async (req, res) => {
    const id = req.params.id;
  
    try {
      const articles = await shopService.getArticles(id);
  
      if (!articles) {
        return res.status(404).send("Aucun article trouvé pour cette catégorie.");
      }
  
      return res.status(200).json(articles);
    } catch (error) {
      console.error('Controller encountered an unexpected error: ', error);
      return res.status(500).send("Erreur lors de la récupération des articles");
    }
  };

  exports.getRandomArticles = async (req, res) => {
    console.log("ici")
 
    try {
      const articles = await shopService.getRandomArticles();
  
      if (!articles) {
        return res.status(404).send("Aucun article trouvé.");
      }
  
      return res.status(200).json(articles);
    } catch (error) {
      console.error('Controller encountered an unexpected error: ', error);
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
        console.error('Controller encountered an unexpected error: ', error);
        return res.status(500).send("Erreur lors de la récupération des catégories");
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
          console.error('Controller encountered an unexpected error: ', error);
          return res.status(500).send("Erreur lors de la récupération des catégories");
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
          console.error('Controller encountered an unexpected error: ', error);
          return res.status(500).send("Erreur lors de la récupération des catégories");
        }
      };


      
  