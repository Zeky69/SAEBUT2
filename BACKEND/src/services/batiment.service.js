const pool = require('../database/db');

async function getBatByIdPrestataire(req, callback) {
    const idPresta = req.params.idPresta;
    const client = await pool.connect();
    try{
        const res=await client.query(`SELECT * FROM BATIMENT WHERE prestataire_id = $1`,[idPresta])
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
                     FROM batiment
                     WHERE id_batiment = $1`;
        oldDisplay = await client.query(query, [id_batiment]);
        if (oldDisplay.rows[0].use_resa === false) {
            display = true;
        }
        query = `UPDATE batiment
                 SET use_resa=$1
                 WHERE id_batiment = $2`;
        res = await client.query(query, [display, id_batiment]);
        callback(null, "ok");
    } catch (err) {
        callback(err, null);
    } finally {
        client.release();
    }
}

module.exports = {
    getBatByIdPrestataire,
    updateDisplay
}