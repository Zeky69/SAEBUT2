const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');
const pool = require("../database/db.js")



const getToilette = async (req,res) => {
    const client = await pool.connect();
    try {
        const toiletteQuery = 'SELECT * FROM toilette';
        const toilettes = await client.query(toiletteQuery);

        const toilette = toilettes.rows;
        console.log("toilette",toilette);
        return toilette;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}


const getToiletteUUID = async (uuid) => {
    const client = await pool.connect();
    let uuidToilette = uuid;
    try {
        const toiletteQuery = 'SELECT * FROM toilette WHERE id_toilette = $1';
        const toilettes = await client.query(toiletteQuery,[uuidToilette]);

        const toilette = toilettes.rows[0];
        console.log("toilette",toilette);
        return toilette;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}


const createToilette = async (req,res) => {
    const client = await pool.connect();
    try {
        const { description, nom, name, posx, posy, posz, rota } = req.body;
        const id_toilette = uuidv4();
        const toiletteQuery = 'INSERT INTO toilette (id_toilette, description, nom, name, posx, posy, posz, rota) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
        const toilettes = await client.query(toiletteQuery,[id_toilette, description, nom, name, posx, posy, posz, rota]);

        const toilette = toilettes.rows[0];
        console.log("toilette",toilette);
        return toilette;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}

const deleteToilette = async (uuid) => {
    const client = await pool.connect();
    let uuidToilette = uuid;
    try {
        const toiletteQuery = 'DELETE FROM toilette WHERE id_toilette = $1';
        const toilettes = await client.query(toiletteQuery,[uuidToilette]);

        const toilette = toilettes.rows[0];
        console.log("toilette",toilette);
        return toilette;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}


module.exports = {
    getToilette,
    getToiletteUUID,
    createToilette,
    deleteToilette
}