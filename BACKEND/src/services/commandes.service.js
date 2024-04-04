//commandes.service.js

const pool = require("../database/db.js");

async function getCommandes() {
    const client = await pool.connect();
    try {
        const query = `SELECT * FROM ligneCommandeBillet`;
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