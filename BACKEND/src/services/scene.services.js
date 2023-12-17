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
        console.log("scene",scene);
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
        console.log("scene",scene);
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
        console.log("scene", scene);
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
        const sceneQuery = 'DELETE FROM scene WHERE id_scene = $1';
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


module.exports = {
    getScene,
    getSceneUUID,
    saveScene,
    deleteScene
}