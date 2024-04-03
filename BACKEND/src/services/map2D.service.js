const pool = require("../database/db.js")




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

const getTerrainWithPrestataire = async (req,res) => {
    const client = await pool.connect();
    try {
        const terrainQuery = 'select nom , id_emplacement, description ,t.id_type ,prestataire_id , matricepoints , t.marker from emplacement inner join public.type t on t.id_type = emplacement.id_type  where prestataire_id is not null';
        const res = await client.query(terrainQuery);
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
    getType,
    getTerrainWithPrestataire
}




