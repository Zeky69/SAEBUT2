const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');
const pool = require("../database/db.js")


const getScene = async (req,res) => {
    const client = await pool.connect();
    try {
        const sceneQuery = 'SELECT * FROM scene';
        const scenes = await client.query(sceneQuery);

        const scene = scenes.rows;
        return scene;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}


const getSceneUUID = async (uuid) => {
    const client = await pool.connect();
    let uuidScene = uuid;
    try {
        const sceneQuery = 'SELECT * FROM scene WHERE id_scene = $1';
        const scenes = await client.query(sceneQuery,[uuidScene]);

        const scene = scenes.rows[0];
        return scene;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}

/*
CREATE TABLE scene(
   id_scene VARCHAR(50),
   description VARCHAR(50),
   nom VARCHAR(50),
   name VARCHAR(50),
   posx DECIMAL(24,17),
   posy DECIMAL(24,17),
   posz DECIMAL(24,17),
   rota DECIMAL(24,17),
   PRIMARY KEY(id_scene),
);

 */


const saveScene = async (req) => {
    const client = await pool.connect();
    let info = req.body;
    let uuid = uuidv4();
    try {
        const sceneQuery = 'INSERT INTO scene (id_scene,description,nom,name,posx,posy,posz,rota) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
        const scenes = await client.query(sceneQuery, [uuid, info.description, info.nom, info.name, info.posx, info.posy, info.posz, info.rota]);

        const scene = scenes.rows[0];
        return scene;
    } catch (error) {
        console.log("error", error);
        return error;
    } finally {
        client.release();
    }
}


const deleteScene = async (req) => {
    const client = await pool.connect();
    let uuid = req.params.uuid;
    try {
        const sceneQuery = 'DELETE FROM batiment WHERE id_batiment = $1';
        const deleteSceneValues = [uuid];
        const scenes = await client.query(sceneQuery,deleteSceneValues);

    }
    catch (error) {
        console.error("error",error);
    }
    finally {
        client.release();
    }
}





const getEvent = async (req,res) => {
    let uuidScene = req.params.uuid;
    const client = await pool.connect();
    try {
        const eventQuery = 'SELECT * FROM event WHERE id_batiment = $1';
        const events = await client.query(eventQuery,[uuidScene]);

        const event = events.rows;
        console.log("event",event);
        return event;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }

}

const getEventUUID = async (req,res) => {
    const client = await pool.connect();
    let uuidEvent = req
    try {
        const eventQuery = 'SELECT * FROM event WHERE id_event = $1';
        const events = await client.query(eventQuery,[uuidEvent]);

        const event = events.rows[0];
        console.log("event",event);
        return event;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}


/*
INSERT INTO event VALUES ('1', 'premier concert', 'description event 1','9fcbe75a-2918-4fbd-a558-dc994100f656', 'red', 'acepted', '2024-06-01T12:30:00', '2024-06-01T14:30:00'),
 */

const saveEvent = async (req) => {
    const client = await pool.connect();
    let info = req.body;
    let uuid = uuidv4();
    console.log("info creat event",info);
    console.log("uuid",uuid);
    try {
        const eventQuery = 'INSERT INTO event (id_event,description,nom,id_batiment,color,status,start_date,end_date, id_prestataire) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9) RETURNING *';
        const events = await client.query(eventQuery, [uuid, info.description, info.nom, info.id_scene, info.couleur, info.etat, info.date_debut, info.date_fin, info.id_prestataire]);

        const event = events.rows[0];
        return event;
    } catch (error) {
        console.log("error", error);
        return error;
    } finally {
        client.release();
    }
}


const deleteEvent = async (req) => {
    const client = await pool.connect();
    let uuid =req;
    try {
        const eventQuery = 'DELETE FROM event WHERE id_event = $1';
        const deleteEventValues = [uuid];
        const events = await client.query(eventQuery,deleteEventValues);

    }
    catch (error) {
        console.error("error",error);
    }
    finally {
        client.release();
    }

}





module.exports = {
    getScene,
    getSceneUUID,
    saveScene,
    deleteScene,

    getEvent,
    getEventUUID,
    saveEvent,
    deleteEvent
}