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

async function getAllResa (req,callback) {
    let id_emp = req.query.id_emp;
    const client = await pool.connect();
    try{
        const query = `SELECT * from reservation where id_client is not null and id_emplacement=$2 ORDER BY ouverture ASC`;
        res = await client.query(query,[id_client,id_emp]);
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
    let id_client = req.query.user_id;
    let id_emp = req.query.id_emp;
    const client = await pool.connect();
    try{
        const query = `SELECT * from reservation where id_client=$1 AND id_emplacement=$2 ORDER BY ouverture ASC`;
        res = await client.query(query,[id_client,id_emp]);
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
    let id = req.query.id;
    const client = await pool.connect();
    try{
        const query = `select * from reservation where id_emplacement=$1 AND id_client IS NULL ORDER BY ouverture ASC`;
        res = await client.query(query,[id]);
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

async function getAuth (req,callback) {
    let id_emp = req.query.id_emp;
    let user_id = req.query.user_id;
    const client = await pool.connect();
    try{
        const query = `select * from possède where id_emplacement=$1 and id_prestataire=$2`;
        res = await client.query(query,[id_emp,user_id]);
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function createDispo (req,callback) {
    let id_emp = req.body.id_emp;
    let date = req.body.date;
    let duree = req.body.duree;
    let ArrayDuree = duree.split(":");
    duree = parseInt(ArrayDuree[0])*60+parseInt(ArrayDuree[1]);
    console.log("Test"+req.body.id_emp+req.body.date);
    const client = await pool.connect();
    try{
        const query = `INSERT INTO reservation (id_emplacement,ouverture,duree) VALUES ($1, $2, $3)`;
        res = await client.query(query, [id_emp, date, duree]);
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
        const query = `update reservation set id_client=$1 where id_reservation=$2`;
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
    console.log(id_reservation);
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
    console.log(id_reservation);
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
    getAllResa:getAllResa,
    getAllDispoById:getAllDispoById,
    getAuth:getAuth,
    createDispo:createDispo,
    reserver:reserver,
    deleteDispoById:deleteDispoById,
    deleteResaById:deleteResaById,
    test:test
};
