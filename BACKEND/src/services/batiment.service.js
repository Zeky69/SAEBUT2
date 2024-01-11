const pool = require('../database/db');

async function getBatByIdPrestataire(idPresta){
    const client = await pool.connect();
    try{
        const res=await client.query(`SELECT * FROM BATIMENT WHERE prestataire_id = $1`,[idPresta])
        return res.rows;
    }catch(err){
        console.log("Récupération données impossible -> " + err)

    }finally{
        client.release();
    }
}

module.exports = {
    getBatByIdPrestataire
}