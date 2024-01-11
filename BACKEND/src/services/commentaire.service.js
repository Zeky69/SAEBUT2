const pool = require("../database/db.js")

const getCommentaire = async (req, res) => {
    try {
        const idprestataire = req.params.idprestataire;
        const commentaire = await pool.query("SELECT * FROM commentaire WHERE id_prestataire = $1", [idprestataire]);
        return { error: 0 , data: commentaire.rows };
    } catch (error) {
        console.error(error);
        return { error: 1 , data: "Server Error"};
    }
}

const createCommentaire = async (req, res) => {
    try {
        const { id_prestataire, nom, commentaire, note  } = req.body;
        const newCommentaire = await pool.query("INSERT INTO commentaire (id_prestataire, nom, commentaire, note , date_commentaire) VALUES ($1, $2, $3, $4, now()) RETURNING *", [id_prestataire, nom, commentaire, note ]);
        return { error: 0 , data: newCommentaire.rows[0] };
    } catch (error) {
        console.error(error);
        return { error: 1 , data: "Server Error"};
    }
}

module.exports = {
    getCommentaire,
    createCommentaire
}