//admin.service.js

const pool = require("../database/db.js");

const jwt = require("jsonwebtoken");
const jwtSecret = "djilsietmaxime";

const bcrypt = require("bcrypt");
const saltRounds = 10;

async function loginUser(email, password) {
  const client = await pool.connect();
  try {
    const hashedPasswords = bcrypt.hashSync(password, saltRounds);

    const query = `select * from utilisateurs
        left join MOTS_DE_PASSE_UTILISATEURS ON MOTS_DE_PASSE_UTILISATEURS.user_id=utilisateurs.user_id
        where email=$1;
        `;
    res = await client.query(query, [email]);

    if (res.rows.length > 0) {
      const user = res.rows[0];
      const hashedPassword = user.password;

      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (isMatch) {
        console.log("Connexion réussie");
        return user;
      } else {
        console.log("Mot de passe incorrect");
        return null;
      }
    } else {
      console.log("Utilisateur non trouvé");
      return null;
    }
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    return null;
  } finally {
    client.release();
  }
}

async function registerUser(nom, prenom, email, description, siret) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let query = `INSERT INTO UTILISATEURS (FIRST_NAME, LAST_NAME, email, Date_Created, Group_Id)
            VALUES ($1, $2, $3, now(), 2)
            RETURNING User_id;`;

    let res = await client.query(query, [nom, prenom, email]);
    const prestataireId = res.rows[0].user_id;

    query = `INSERT INTO prestataire (description, nom, id_user, etat_id)
            VALUES ($1, $2, $3, 1) returning id_prestataire;`;

    let resu = await client.query(query, [description, nom, prestataireId]);

    await client.query("COMMIT");

    console.log("Demande d'inscription réussi");
    console.log(resu);
    return resu.rows[0].id_prestataire;
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
  } finally {
    client.release();
  }
}

async function registerGhostsUser(nom, prenom, email) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let checkQuery = "SELECT User_id FROM UTILISATEURS WHERE email = $1";
    let checkRes = await client.query(checkQuery, [email]);

    if (checkRes.rows.length > 0) {
      await client.query("COMMIT");
      return checkRes.rows[0].user_id;
    }

    let insertQuery = `INSERT INTO UTILISATEURS (FIRST_NAME, LAST_NAME, email, Date_Created, Group_Id)
            VALUES ($1, $2, $3, now(), 3)
            RETURNING User_id;`;

    let insertRes = await client.query(insertQuery, [nom, prenom, email]);
    await client.query("COMMIT");

    return insertRes.rows[0].user_id;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
  } finally {
    client.release();
  }
}

async function getInformationWithToken(token) {
  let response;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.error("Erreur de décodage du token :");
    } else {
      console.log("Token décodé :", decoded);
      response = {
        id: decoded.user_id,
        fname: decoded.first_name,
        lname: decoded.last_name,
        email: decoded.email,
        group_id: decoded.group_id,
      };
    }
  });
  return response;
}

async function getPrestataireObject(id_user) {
  const client = await pool.connect();
  try {
    const query = `SELECT * FROM prestataire WHERE id_user=$1`;
    const result = await client.query(query, [id_user]);
    return result.rows;
  } catch (err) {
    console.log("Erreur lors de la récupération du prestataire");
  } finally {
    client.release();
  }
}

async function getUserByEmail(email) {
  const client = await pool.connect();

  try {
    const query = "SELECT * FROM UTILISATEURS WHERE email = $1";
    const result = await client.query(query, [email]);

    return result.rows[0];
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  getUserByEmail,
  loginUser: loginUser,
  registerUser: registerUser,
  getInformationWithToken: getInformationWithToken,
  getPrestataireObject: getPrestataireObject,
  registerGhostsUser: registerGhostsUser,
};
