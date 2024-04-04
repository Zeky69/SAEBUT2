//admin.service.js

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const filePath = path.join(__dirname, "..", "datasource/users.json");
const crypto = require("crypto");
const sendMail = require("./SendMail");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const pool = require("../database/db");

async function getAllUsers() {
  const client = await pool.connect();
  try {
    const res =
      await client.query(`SELECT u.FIRST_NAME, u.LAST_NAME, prestataire.description, u.email, u.date_created, etat_libelle,prestataire.etat_id, id_prestataire, prestataire.id_user
        from prestataire
        INNER JOIN ETAT e on e.etat_id = prestataire.etat_id
        INNER JOIN UTILISATEURS u on u.user_id = prestataire.id_user
        WHERE u.group_id !=1
        ORDER BY etat_libelle ASC;`);
    return res.rows;
  } catch (err) {
    console.log("Récupération données impossible -> " + err);
  } finally {
    client.release();
  }
}

async function acceptPrestataire(user_id, prestataire_id) {
  const client = await pool.connect();

  try {
    const querySelect = `SELECT prestataire.id_user, prestataire.nom, utilisateurs.email from prestataire
    INNER JOIN utilisateurs on utilisateurs.user_id = prestataire.id_user
    WHERE prestataire.id_user= $1;`;

    const result = await client.query(querySelect, [user_id]);

    const email = result.rows[0].email;
    const nom = result.rows[0].nom;

    const mdp = nom + crypto.randomBytes(5).toString("hex");

    const hashedPassword = bcrypt.hashSync(mdp, saltRounds);

    const queryUpdate =
      "UPDATE prestataire SET etat_id = 2 WHERE id_prestataire = $1;";
    const queryInsertPassword = `INSERT INTO MOTS_DE_PASSE_UTILISATEURS(user_id, password) VALUES ($1, $2);`;

    await client.query("BEGIN");

    await client.query(queryUpdate, [prestataire_id]);

    await client.query(queryInsertPassword, [user_id, hashedPassword]);

    await client.query("COMMIT");

    const subject = "Création compte prestaire pour " + nom;
    const content =
      "Le compte prestataire a été crée avec succès pour " +
      nom +
      "\n Voici l'email ainsi que le mot de passe pour se connecter" +
      "\n Email : " +
      email +
      "\n Mot de passe : " +
      mdp +
      "\n\n Cordialement\n L'équipe Belforaine";

    sendMail.sendEmail(subject, email, content);
    console.log(`Prestataire accepté avec succès (ID: ${prestataire_id})`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Acceptation du prestataire échouée:", err);
  } finally {
    client.release();
  }
}

async function refusePrestataire(id) {
  const client = await pool.connect();
  try {
    const query =
      "UPDATE prestataire SET etat_id = 3 WHERE id_prestataire = $1;";
    const result = await client.query(query, [id]);
    console.log(`Prestataire refusé avec succès (ID: ${id})`);
  } catch (err) {
    console.error("Refus du prestataire échoué:", err);
  } finally {
    client.release();
  }
}

async function removePrestataire(user_id, prestataire_id) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM service WHERE id_prestataire = $1;", [
      prestataire_id,
    ]);

    await client.query("DELETE FROM reservation WHERE id_prestataire = $1;", [
      prestataire_id,
    ]);
    await client.query("DELETE FROM commentaire WHERE id_prestataire = $1;", [
      prestataire_id,
    ]);
    await client.query(
      "UPDATE emplacement SET prestataire_id = NULL and accepted=false WHERE prestataire_id = $1;",
      [prestataire_id]
    );

    await client.query("DELETE FROM produit WHERE prestataire_id = $1;", [
      prestataire_id,
    ]);

    await client.query("DELETE FROM prestataire WHERE id_prestataire = $1;", [
      prestataire_id,
    ]);

    await client.query(
      "DELETE FROM MOTS_DE_PASSE_UTILISATEURS WHERE User_Id = $1;",
      [user_id]
    );
    await client.query("DELETE FROM UTILISATEURS WHERE User_Id = $1;", [
      user_id,
    ]);
    await client.query("COMMIT");
    console.log("Suppression réussie !");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Erreur lors de la suppression :", err);
  } finally {
    client.release();
  }
}

const createUser = (req, callback) => {
  const { permission, email, password } = req.body;
  let users = [];
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const dataStr = data.toString();
    users = JSON.parse(dataStr);
  } catch (errorLecture) {
    console.log(errorLecture);
  }
  const newUser = {
    id_user: uuidv4(),
    permission: permission,
    login: email,
    password: password,
  };
  users.push(newUser);
  try {
    fs.writeFileSync(filePath, JSON.stringify(users));
    callback(null, "success");
  } catch (errorEcriture) {
    callback(errorEcriture, null);
  }
};

const deleteUser = (req, callback) => {
  let id = req.body.id_user;
  let users = [];
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const dataStr = data.toString();
    temp = JSON.parse(dataStr);
    users = temp.filter((user) => user.id_user != id);
  } catch (errorLecture) {
    console.log(errorLecture);
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(users));
    callback(null, "success");
  } catch (errorEcriture) {
    callback(errorEcriture, null);
  }
};

const changeUser = (req, callback) => {
  const { id_user, permission, email, password } = req.body;
  let users = [];
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const dataStr = data.toString();
    temp = JSON.parse(dataStr);
    users = temp.filter((user) => user.id_user != id_user);
  } catch (errorLecture) {
    console.log(errorLecture);
  }
  const newUser = {
    id_user: id_user,
    permission: permission,
    login: email,
    password: password,
  };
  users.push(newUser);
  try {
    fs.writeFileSync(filePath, JSON.stringify(users));
    callback(null, "success");
  } catch (errorEcriture) {
    callback(errorEcriture, null);
  }
};



const getContenueHomePage = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM contenuHomePage;");
        return res.rows[0].contenu;
    } catch (err) {
        console.log("Récupération données impossible -> " + err);
    } finally {
        client.release();
    }

}

const setHomePage = async (contenu) => {
    const client = await pool.connect();
    try {
        const query = "UPDATE contenuHomePage SET contenu = $1 where id_contenu = 1";
        const res = await client.query(query, [contenu]);
        return "Parfait";
    }
    catch (err) {
        console.log("Récupération données impossible -> " + err);
    } finally {
        client.release();
    }

}

module.exports = {
  acceptPrestataire,
  refusePrestataire,
  createUser: createUser,
  getAllUsers: getAllUsers,
  deleteUser: deleteUser,
  changeUser: changeUser,
  removePrestataire,
    getContenueHomePage,
  setHomePage
};
