// shop.service

const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');


async function getAllArticles(){
    const client = await pool.connect();
    try{
        const query = `SELECT * from produit;`

        const res = await client.query(query)
        console.log("Récupération des articles réussis");
        return res.rows;
    }catch(err){
        console.log("Echec récupération des articles")
        console.log(err)
    }finally{
        client.release();
    }
}

async function getArticlesByPrestataire(id_prestataire){
    const client = await pool.connect();
    try{
        const query = `SELECT * from produit
        WHERE id_prestataire=$1;`;

        const res = await client.query(query,[id_prestataire])
        console.log("Récupération des articles réussis");
        return res.rows;
    }catch(err){
        console.log("Echec récupération des articles")
        console.log(err)
    }finally{
        client.release();
    }
}

async function getArticle(id_produit){
    const client = await pool.connect();
    try{
        const query = `SELECT * from produit
        WHERE id_produit=$1;`;

        const res = await client.query(query,[id_produit])
        console.log("Récupération de l'article réussis");
        return res.rows[0];
    }catch(err){
        console.log("Echec récupération de l'article")
        console.log(err)
    }finally{
        client.release();
    }
}


async function getArticlesByCategorie(id_categorie){
    const client = await pool.connect();
    try{
        const query = `SELECT * from produit
        WHERE categorie_id=$1;`;

        const res = await client.query(query,[id_categorie])
        console.log("Récupération des articles réussis");
        return res.rows;
    }catch(err){
        console.log("Echec récupération des articles")
        console.log(err)
    }finally{
        client.release();
    }
}

async function getRandomArticles(){
    const client = await pool.connect();
    try{
        const query = `SELECT * from produit
        INNER JOIN categorie_produit c on c.id_categorie = produit.categorie_id 
        order by random() limit 6;`;
        
        const res = await client.query(query)
        console.log("Récupération des articles réussis");
        return res.rows;
    }catch(err){
        console.log("Echec récupération des articles")
        console.log(err)
    }finally{
        client.release();
    }
}

async function getCommandes(){
    console.log("getCommandes service back")
    const client = await pool.connect();
    try{
        const query = `SELECT * from commande JOIN ligneCommandeArticle on commande.id_commande = ligneCommandeArticle.id_commande 
        JOIN produit on ligneCommandeArticle.id_produit = produit.id_produit;`

                const res = await client.query(query)
                console.log("Récupération des commandes");
                return res.rows;
            }catch(err){
                console.log("Echec récupération des commandes")
                console.log(err)
            }finally{
                client.release();
            }
        }

        async function getCommande(id_commande){
            const client = await pool.connect();
            try{
                const query = `SELECT * from commande join ligneCommandeArticle on commande.id_commande = ligneCommandeArticle.id_commande
        WHERE id_commande=$1;`;

        const res = await client.query(query,[id_commande])
        console.log("Récupération des commandes");
        return res.rows[0];
    }catch(err){
        console.log("Echec récupération des commandes")
        console.log(err)
    }finally{
        client.release();
    }
}


async function updateCommandeLigne(id_commande,id_produit) {
    //valider une ligne de commande
    const client = await pool.connect();
    try {
        const query = `UPDATE ligneCommandeArticle
                       SET valide= true
                       WHERE id_commande = $1
                         AND id_produit = $2;`;

        const res = await client.query(query, [id_commande, id_produit])
        console.log("Validation de la ligne de commande réussie");
        return true;
    }
    catch (err) {
        console.log("Echec validation de la ligne de commande")
        console.log(err)
        return false;
    }
}



async function getAllCategorie(){
    const client = await pool.connect();
    try{
        const query = `SELECT * from categorie_produit;`
        
        const res = await client.query(query)
        console.log("Récupération des catégories");
        return res.rows;
    }catch(err){
        console.log("Echec récupération des catégories")
        console.log(err)
    }finally{
        client.release();
    }
}

async function getCategorie(id_categorie){
    const client = await pool.connect();
    try{
        const query = `SELECT * from categorie_produit
        WHERE id_categorie=$1;`;
        
        const res = await client.query(query,[id_categorie])
        console.log("Récupération des catégories");
        return res.rows[0];
    }catch(err){
        console.log("Echec récupération des catégories")
        console.log(err)
    }finally{
        client.release();
    }
}

async function getCategorieByproduct(id_produit){
    const client = await pool.connect();
    try{
        client.query("BEGIN");     


        let query = `SELECT categorie_id from produit
        WHERE id_produit=$1;`;
        
        let res = await client.query(query,[id_produit])

        const cat_id= res.rows[0].categorie_id;

        query = `SELECT * from categorie_produit
        WHERE id_categorie=$1;`;
        
        res = await client.query(query,[cat_id])
        client.query("COMMIT")


        console.log("Récupération des catégories");
        return res.rows[0];
    }catch(err){
        console.log("Echec récupération des catégories")
        client.query("ROLLBACK")
        console.log(err)
    }finally{
        client.release();
    }
}


async function setCommande(iduser){
    const client = await pool.connect();
    try{

        let sql = `INSERT INTO commande (date_commande, id_user) VALUES (now(), $1) RETURNING id_commande;`;
        let values = [iduser];
        let result = await client.query(sql, values);
        return result.rows[0].id_commande;

    }catch(err){
        console.log(err)
        return null;
    }finally{
        client.release();
    }
}

async function setCommandeLineArticle(id_commande,id_produit,quantite){
    const client = await pool.connect();
    try{
        let sql = `INSERT INTO ligneCommandeArticle (id_commande, id_produit, quantite,valide) VALUES ($1, $2, $3, $4);`;
        let values = [id_commande,id_produit,quantite,false];
        let result = await client.query(sql, values);
        return true;

    }catch(err){
        console.log(err)
        return false;
    }finally{
        client.release();
    }
}

async function setCommandeLineBillet(id_commande,id_billet,subId,nom,prenom, dateJSON){
    const client = await pool.connect();
    try{
        // generate uuidv4 and return it
        let uuid = uuidv4();
        let sql = `INSERT INTO ligneCommandeBillet (uuid,id_commande, id_billet, subId, nom, prenom, date) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING uuid;`;
        let values = [uuid,id_commande,id_billet,subId,nom,prenom, dateJSON];
        let result = await client.query(sql, values);
        return result.rows[0].uuid;

    }catch(err){
        console.log(err)
        return false;
    }finally{
        client.release();
    }
}





module.exports ={
    getAllArticles,
    getArticlesByCategorie,
    getArticlesByPrestataire,
    getArticle,
    getAllCategorie,
    getCategorie,
    getCommandes,
    getCommande,
    getRandomArticles,
    getCategorieByproduct,
    setCommande,
    setCommandeLineArticle,
    setCommandeLineBillet
}