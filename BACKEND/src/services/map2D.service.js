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

const getAllEmplacementWithBatiment = async (req,res) => {
    const client = await pool.connect();
    try {
        const emplacementQuery = 'SELECT b.nom , b.description , t.marker , t.id_type , emplacement.matricePoints FROM emplacement INNER JOIN public.batiment b on emplacement.id_emplacement = b.id_emplacement INNER JOIN public.type t on t.id_type = b.type_id';
        const res = await client.query(emplacementQuery);
        return res.rows;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}

const getAllScenes = async (req,res) => {
    const client = await pool.connect();
    try {
        const sceneQuery = 'SELECT * FROM scene';
        const res = await client.query(sceneQuery);
        return res.rows;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}


const getType = async (req,res) => {
    const client = await pool.connect();
    try {
        const typeQuery = 'select id_type as value , libelle from type\n';
        const res = await client.query(typeQuery);
        return res.rows;
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
    getAllEmplacementWithBatiment,
    getAllScenes,
    getType
}




