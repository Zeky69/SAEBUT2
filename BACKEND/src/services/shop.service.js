// shop.service

const pool = require('../database/db');

async function getArticles(id_categorie){
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


module.exports ={
    getArticles,
    getCategorie
}