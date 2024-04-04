//statistiques.service.js

const pool = require("../database/db.js");

async function getVenteBilletParDate() {
    const client = await pool.connect();
    try {
        const query = `SELECT count(uuid) as nbr_billet_vendus, date FROM ligneCommandeBillet
                       group by date;`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes de billets par date: ", error);
        return null;
    } finally {
        client.release();
    }
}

async function getVenteArticle() {
    const client = await pool.connect();
    try {
        const query = `SELECT p.nom, sum(lca.quantite) as quantiteTotaleArticle, p.prix, p.prix*sum(lca.quantite) as prixTotalArticle
                       FROM ligneCommandeArticle lca
                                JOIN produit p ON lca.id_produit = p.id_produit
                       group by p.id_produit
        ;`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes de billets par type: ", error);
        return null;
    } finally {
        client.release();
    }
}

async function getVenteBilletParType() {
    const client = await pool.connect();
    try {
        const query = `SELECT b.title, count(lcb.uuid) as quantiteTotaleBillet, b.price, b.price*count(lcb.uuid) as prixTotalBillet
                       FROM ligneCommandeBillet lcb
                                JOIN billet b ON lcb.id_billet = b.id
                       group by b.id, b.title, b.price
        ;`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes d'articles: ", error);
        return null;
    } finally {
        client.release();
    }
}

async function getVenteParCategorie() {
    const client = await pool.connect();
    try {
        const query = `SELECT libelle_categorie, SUM(produitVendu.totalVenteProduit) as totalVenteCategorie
                               from categorie_produit
                                        join (
                                   SELECT p.categorie_id, p.prix*sum(l.quantite) as totalVenteProduit from lignecommandearticle l
                                                                                                               join produit p on l.id_produit = p.id_produit
                                   group by p.id_produit)
                                   produitVendu on categorie_produit.id_categorie = produitVendu.categorie_id
                               group by id_categorie;`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes par catégorie: ", error);
        return null;
    } finally {
        client.release();
    }
}

async function getConnextionToday(){
    const client = await pool.connect();
    try {
        const query = `select count(*) as visiteur from visiteursite where date_visite=now()::date`;
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes de billets par date: ", error);
        return null;
    } finally {
        client.release();
    }

}


async function addConnexionToday(){
    const client = await pool.connect();
    try {
        const query = `INSERT INTO visiteursite (date_visite) VALUES ($1);`;
        await client.query(query, [new Date().toISOString().split('T')[0]]);
        return true;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la connexion: ", error);
        return false;
    } finally {
        client.release();
    }

}

module.exports = {
    getVenteArticle,
    getVenteBilletParDate,
    getVenteParCategorie,
    getVenteBilletParType,
    getConnextionToday,
    addConnexionToday
}