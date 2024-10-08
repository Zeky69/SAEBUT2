//statistiques.service.js

const pool = require("../database/db.js");

async function getVenteBilletParDate() {
    const client = await pool.connect();
    try {
        const query = `WITH dates AS (
            SELECT generate_series(
                           (SELECT MIN(date) FROM ligneCommandeBillet),
                           (SELECT MAX(date) FROM ligneCommandeBillet),
                           INTERVAL '1 day'
                   ) AS date
        )
                       SELECT
                           TO_CHAR(d.date, 'DD Mon YYYY') AS date,
                           COALESCE(COUNT(l.uuid), 0) AS nbr_billet_vendus
                       FROM
                           dates d
                               LEFT JOIN
                           ligneCommandeBillet l ON DATE_TRUNC('day', d.date) = DATE_TRUNC('day', l.date)
                       GROUP BY
                           d.date
                       ORDER BY
                           d.date;`;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes de billets par date: ", error);
        return null;
    } finally {
        client.release();
    }
}

async function getVenteArticle(req) {
    const client = await pool.connect();
    try {
        let res;
        if (req.params.id){
            const query = `SELECT p.nom, sum(lca.quantite) as quantiteTotaleArticle, p.prix, p.prix*sum(lca.quantite) as prixTotalArticle
                       FROM ligneCommandeArticle lca
                                JOIN produit p ON lca.id_produit = p.id_produit
                       where prestataire_id = $1
                       group by p.id_produit
                        ;`;
            res = await client.query(query, [req.params.id]);
        } else {
            const query = `SELECT p.nom, sum(lca.quantite) as quantiteTotaleArticle, p.prix, p.prix*sum(lca.quantite) as prixTotalArticle
                       FROM ligneCommandeArticle lca
                                JOIN produit p ON lca.id_produit = p.id_produit
                       group by p.id_produit
                        ;`;
            res = await client.query(query);
        }

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
        const query = `INSERT INTO visiteursite (date_visite) VALUES (now()::date);`;
        await client.query(query, );
        return true;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la connexion: ", error);
        return false;
    } finally {
        client.release();
    }

}

async function getVentesTotales(){
    const client = await pool.connect();
    try {
        const query = `SELECT SUM(ventes) as vente_total from (
                              SELECT SUM(prixTotalBillet) as ventes
                              from (SELECT b.price * count(lcb.uuid) as prixTotalBillet
                                    FROM ligneCommandeBillet lcb
                                             JOIN billet b ON lcb.id_billet = b.id
                                    group by b.id, b.title, b.price) as lbpTB
                              UNION
                              SELECT SUM(prixTotalArticle) as ventes
                              from (SELECT p.prix * sum(lca.quantite) as prixTotalArticle
                                    FROM ligneCommandeArticle lca
                                             JOIN produit p ON lca.id_produit = p.id_produit
                                    group by p.id_produit) as lbpTA
                          ) as lTvlTv;`;
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes totales: ", error);
        return null;
    } finally {
        client.release();
    }
}



async function getCountCommande(){
    const client = await pool.connect();
    try {
        const query = `select count(*) as nombre from commande;`;
        const res = await client.query(query);
        return res.rows[0];
    } catch (error) {
        console.error("Erreur lors de la récupération des ventes de billets par date: ", error);
        return null;
    } finally {
        client.release();
    }

}


async function getAverageNote(id_prestataire){
    const client = await  pool.connect()
        try{
            const query = "SELECT COALESCE(ROUND(AVG(note), 2), 0) AS note FROM commentaire WHERE id_prestataire = $1" +
                "";
            const res = await client.query(query, [id_prestataire]);
            return res.rows[0];
        }catch (e){
            console.error("Erreur lors de la récupération des notes moyennes: ", e);
        }
    }



module.exports = {
    getVenteArticle,
    getVenteBilletParDate,
    getVenteParCategorie,
    getVenteBilletParType,
    getConnextionToday,
    addConnexionToday,
    getVentesTotales,
    getCountCommande,
    getAverageNote
}