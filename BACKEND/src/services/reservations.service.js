const pool = require("../database/db.js");
const sendMail = require("./SendMail");

async function test (req,callback) {
    const client = await pool.connect();
    try{
        const query = `select * from emplacement`;
        res = await client.query(query);
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function getAllResaByIdUser (req,callback) {
    let id_bat = req.params.id_bat;
    let id_client = req.params.id_user;
    const client = await pool.connect();
    try{
        const query = `SELECT * from reservation where id_ticket_client=$1 and id_emplacement=$2 ORDER BY ouverture ASC`;
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
    let id_bat = req.params.id_bat;
    const client = await pool.connect();
    try{
        const query = `select ouverture,duree, id_emplacement, id_ticket_client, count(id_reservation) as amount,(SELECT id_reservation  from reservation r2 where id_emplacement=$1 AND id_ticket_client IS NOT NULL AND r1.ouverture=r2.ouverture AND r1.duree=r2.duree LIMIT 1)  from reservation r1 where id_emplacement=$1 AND id_ticket_client IS NOT NULL GROUP BY ouverture,duree, id_emplacement, id_ticket_client ORDER BY ouverture ASC`;
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
    let id_bat = req.params.id_bat;
    const client = await pool.connect();
    try{
        const query = `select nom, description, color, status, id_prestataire, ouverture,duree, id_emplacement, id_ticket_client, count(id_reservation) as amount,(SELECT id_reservation  from reservation r2 where id_emplacement=$1 AND id_ticket_client IS NULL AND r1.ouverture=r2.ouverture AND r1.duree=r2.duree LIMIT 1)  from reservation r1 where id_emplacement=$1 AND id_ticket_client IS NULL GROUP BY ouverture,duree, id_emplacement, id_ticket_client,nom, description, color, status,id_prestataire ORDER BY ouverture ASC`;
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
    let description = req.body.description;
    let nom = req.body.nom;
    let color = req.body.color;
    let status = req.body.status;
    let id_prestataire = req.body.id_prestataire;
    const client = await pool.connect();
    try{
        const query = `INSERT INTO reservation (id_emplacement,ouverture,duree,description,nom,color,status,id_prestataire) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        res = await client.query(query, [id_bat, date, duree,description, nom, color, status, id_prestataire]);
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
        let query = `SELECT * FROM lignecommandebillet where uuid = $1;`;
        res = await client.query(query, [id_client]);
        if (res.rows.length!==0){
            query = `select * from reservation where id_reservation=$1`;
            res = await client.query(query, [id_reservation]);
            if (res.rows.length!==0){
                let data = res.rows[0]
                query = `update reservation set id_ticket_client=$1 where id_reservation=$2`;
                res = await client.query(query, [id_client, id_reservation]);

                query = `SELECT email from utilisateurs
                            JOIN public.commande c on utilisateurs.user_id = c.id_user
                            JOIN public.lignecommandebillet l on c.id_commande = l.id_commande
                            WHERE uuid = $1`
                res = await client.query(query, [id_client]);
                await sendMail.sendEmail("Reservation enregistrée", res.rows[0].email, formatResa(data));
                callback(null,"c good");
            } else {
                callback("ce crénaux n'existe pas", null)
            }

        }
        else {
            callback("ce billet n'existe pas", null)
        }
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

function formatResa(data) {
    return "Votre réservation pour le " +
        data.ouverture + "durant " + data.duree +
        " est validée. " +
        "\n Cliquez ici pour l'annuler : http://localhost:8081/restauration/" + data.id_reservation +
        "\n\n Cordialement\n L'équipe Belforaine ";
}

async function deleteDispoById(req, callback){
    let id_reservation = req.params.id_dispo;
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
        const query = `UPDATE reservation SET id_ticket_client=NULL WHERE id_reservation=$1`;
        res = await client.query(query, [id_reservation]);
        callback(null,"c good");
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function getDispoByID(req, callback){
    let id_dispo = req.params.id_dispo;
    //let id = parseInt(id_dispo)
    const client = await pool.connect();
    try{
        const query = `select * from reservation where id_reservation=$1`;
        res = await client.query(query, [id_dispo]);
        callback(null,res.rows);
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function accepterDispo(req, callback){
    let id_dispo = req.params.id_dispo;
    //let id = parseInt(id_dispo)
    const client = await pool.connect();
    try{
        const query = `select id_emplacement, ouverture,duree from reservation where id_reservation=$1`;
        res = await client.query(query, [id_dispo]);

        const query2 = "UPDATE reservation SET status='accepted' WHERE id_emplacement=$1 AND ouverture=$2 AND duree=$3";
        const values = [res.rows[0].id_emplacement, res.rows[0].ouverture, res.rows[0].duree];
        const res2 = await client.query(query2,values);

        callback(null,res2.rows);
    }catch(err){
        callback(err,null);
    }finally{
        client.release();
    }
}

async function getAllResaByIdTicket (req,callback) {
    let id_ticket = req.params.idTicket;
    const client = await pool.connect();
    try{
        const query = `SELECT * from reservation where id_ticket_client=$1 ORDER BY ouverture ASC`;
        res = await client.query(query,[id_ticket]);
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

module.exports = {
    getAllResaById:getAllResaById,
    getAllResaByIdUser:getAllResaByIdUser,
    getAllDispoById:getAllDispoById,
    createDispo:createDispo,
    reserver:reserver,
    deleteDispoById:deleteDispoById,
    deleteResaById:deleteResaById,
    getDispoByID:getDispoByID,
    accepterDispo:accepterDispo,
    getAllResaByIdTicket:getAllResaByIdTicket,
    test:test
};
