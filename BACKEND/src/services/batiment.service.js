const pool = require('../database/db');

async function getBatByIdPrestataire(req, callback) {
    const idPresta = req.params.idPresta;
    const client = await pool.connect();
    try{
        const res=await client.query(`SELECT * FROM emplacement WHERE prestataire_id = $1`,[idPresta])
        callback(null,res.rows);
    }catch(err){
        console.log("Récupération données impossible -> " + err)

    }finally{
        client.release();
    }
}

async function updateDisplay(req, callback){
    let id_batiment= req.body.id_bat;
    const client = await pool.connect();
    let display=false;
    try {
        let query = `SELECT use_resa
                     FROM emplacement
                     WHERE id_emplacement = $1`;
        oldDisplay = await client.query(query, [id_batiment]);
        if (oldDisplay.rows[0].use_resa === false) {
            display = true;
        }
        query = `UPDATE emplacement
                 SET use_resa=$1
                 WHERE id_emplacement = $2`;
        res = await client.query(query, [display, id_batiment]);
        callback(null, "ok");
    } catch (err) {
        callback(err, null);
    } finally {
        client.release();
    }
}

async function getAllBatiment(req, callback){
    const client = await pool.connect();
    let display=false;
    try {
        let query = `SELECT * FROM emplacement;`;
        res = await client.query(query);
        callback(null, res.rows);
    } catch (err) {
        callback(err, null);
    } finally {
        client.release();
    }
}

module.exports = {
    getBatByIdPrestataire,
    updateDisplay,
    getAllBatiment
}