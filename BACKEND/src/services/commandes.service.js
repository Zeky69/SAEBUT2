//commandes.service.js

const pool = require("../database/db.js");

async function getCommandes() {
    const client = await pool.connect();
    try {
        const query = `SELECT DISTINCT uuid, b.title , lignecommandebillet.nom ,lignecommandebillet.prenom , lignecommandebillet.date FROM ligneCommandeBillet Inner Join billet as b on b.id = lignecommandebillet.id_billet`
        ;
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes de billets", error);
        return null;
    } finally {
        client.release();
    }
}


module.exports = {
    getCommandes,
}