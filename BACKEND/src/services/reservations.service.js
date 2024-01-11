const pool = require("../database/db.js");

async function test (req,callback) {
    console.log("test service");
    const client = await pool.connect();
    console.log("test connect bdd");
    try{
        const query = `select * from emplacement`;
        res = await client.query(query);
        console.log("test query"+res.rows);
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
        console.log("test release");
    }
}

async function getAllResaByIdUser (req,callback) {
    let id_bat = req.query.id_bat;
    let id_client = req.query.id_user;
    const client = await pool.connect();
    try{
        const query = `SELECT * from reservation where id_client=$1 and id_batiment=$2 ORDER BY ouverture ASC`;
        res = await client.query(query,[id_client,id_bat]);
        for (let i = 0; i < res.rows.length; i++) {
            res.rows[i].ouverture = res.rows[i].ouverture.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' , year: 'numeric', month: 'numeric', day: 'numeric', hour : "2-digit", minute:"2-digit" });
        }
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function getAllResaById (req,callback) {
    let id_bat = req.query.id_bat;
    const client = await pool.connect();
    try{
        const query = `select ouverture,duree, id_batiment, id_client, count(id_reservation) as amount,(SELECT id_reservation  from reservation r2 where id_batiment=$1 AND id_client IS NOT NULL AND r1.ouverture=r2.ouverture AND r1.duree=r2.duree LIMIT 1)  from reservation r1 where id_batiment=$1 AND id_client IS NOT NULL GROUP BY ouverture,duree, id_batiment, id_client ORDER BY ouverture ASC`;
        res = await client.query(query,[id_bat]);
        for (let i = 0; i < res.rows.length; i++) {
            res.rows[i].ouverture = res.rows[i].ouverture.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' , year: 'numeric', month: 'numeric', day: 'numeric', hour : "2-digit", minute:"2-digit" });
        }
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function getAllDispoById (req,callback) {
    let id_bat = req.query.id_bat;
    const client = await pool.connect();
    try{
        const query = `select ouverture,duree, id_batiment, id_client, count(id_reservation) as amount,(SELECT id_reservation  from reservation r2 where id_batiment=$1 AND id_client IS NULL AND r1.ouverture=r2.ouverture AND r1.duree=r2.duree LIMIT 1)  from reservation r1 where id_batiment=$1 AND id_client IS NULL GROUP BY ouverture,duree, id_batiment, id_client ORDER BY ouverture ASC`;
        res = await client.query(query,[id_bat]);
        for (let i = 0; i < res.rows.length; i++) {
            res.rows[i].ouverture = res.rows[i].ouverture.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' , year: 'numeric', month: 'numeric', day: 'numeric', hour : "2-digit", minute:"2-digit" });
        }
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function createDispo (req,callback) {
    let id_bat = req.body.id_bat;
    let date = req.body.date;
    let duree = req.body.duree;
    let ArrayDuree = duree.split(":");
    duree = parseInt(ArrayDuree[0])*60+parseInt(ArrayDuree[1]);
    const client = await pool.connect();
    try{
        const query = `INSERT INTO reservation (id_batiment,ouverture,duree) VALUES ($1, $2, $3)`;
        res = await client.query(query, [id_bat, date, duree]);
        callback(null,"c good");
    }catch(err){
        console.log(err);
        callback(err,null);
    }finally{
        client.release();
    }
}

async function reserver(req, callback){
    let id_client = req.body.id_client;
    let id_reservation = req.body.id_dispo;
    const client = await pool.connect();
    try{
        let query = `select * from reservation where id_reservation=$1`;
         res = await client.query(query, [id_reservation]);
        query = `update reservation set id_client=$1 where id_reservation=$2`;
        res = await client.query(query, [id_client, id_reservation]);

        callback(null,"c good");
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function deleteDispoById(req, callback){
    let id_reservation = req.body.id_dispo;
    const client = await pool.connect();
    try{
        const query = `delete from reservation where id_reservation=$1`;
        res = await client.query(query, [id_reservation]);
        callback(null,"c good");
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function deleteResaById(req, callback){
    let id_reservation = req.body.id_resa;
    const client = await pool.connect();
    try{
        const query = `UPDATE reservation SET id_client=NULL WHERE id_reservation=$1`;
        res = await client.query(query, [id_reservation]);
        callback(null,"c good");
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}



module.exports = {
    getAllResaById:getAllResaById,
    getAllResaByIdUser:getAllResaByIdUser,
    getAllDispoById:getAllDispoById,
    createDispo:createDispo,
    reserver:reserver,
    deleteDispoById:deleteDispoById,
    deleteResaById:deleteResaById,
    test:test
};
