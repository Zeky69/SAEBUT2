CREATE TABLE utilisateur(
   id_user INT,
   permission BYTE,
   login VARCHAR(50),
   password VARCHAR(50),
   PRIMARY KEY(id_user)
);

CREATE TABLE client(
   id_client VARCHAR(50),
   nom VARCHAR(50),
   prenom VARCHAR(50),
   date_naissance DATE,
   id_user INT,
   PRIMARY KEY(id_client),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user)
);

CREATE TABLE produit(
   id_produit VARCHAR(50),
   nom VARCHAR(50),
   prix CURRENCY,
   stock INT,
   PRIMARY KEY(id_produit)
);

CREATE TABLE intervenant(
   id_intervenant VARCHAR(50),
   contact VARCHAR(50),
   nom VARCHAR(50),
   prenom VARCHAR(50),
   PRIMARY KEY(id_intervenant)
);

CREATE TABLE type(
   id_type VARCHAR(50),
   libelle VARCHAR(50),
   PRIMARY KEY(id_type)
);

CREATE TABLE crenaux(
   date_reservation DATETIME,
   PRIMARY KEY(date_reservation)
);

CREATE TABLE tags(
   id_tag VARCHAR(50),
   libelle VARCHAR(50),
   PRIMARY KEY(id_tag)
);

CREATE TABLE prestataire(
   id_prestataire VARCHAR(50),
   description VARCHAR(255),
   nom VARCHAR(50),
   id_type VARCHAR(50) NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id_prestataire),
   FOREIGN KEY(id_type) REFERENCES type(id_type),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user)
);

CREATE TABLE stand(
   id_stand VARCHAR(50),
   description VARCHAR(50),
   id_type VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_stand),
   FOREIGN KEY(id_type) REFERENCES type(id_type)
);

CREATE TABLE scene(
   id_scene VARCHAR(50),
   description VARCHAR(50),
   id_type VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_scene),
   FOREIGN KEY(id_type) REFERENCES type(id_type)
);

CREATE TABLE attraction(
   id_attraction VARCHAR(50),
   description VARCHAR(255),
   id_type VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_attraction),
   FOREIGN KEY(id_type) REFERENCES type(id_type)
);

CREATE TABLE emplacement(
   id_emplacement VARCHAR(50),
   libelle VARCHAR(50),
   id_type VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_emplacement),
   FOREIGN KEY(id_type) REFERENCES type(id_type)
);

CREATE TABLE reservation(
   id_reservation VARCHAR(50),
   date_reservation DATETIME NOT NULL,
   id_client VARCHAR(50) NOT NULL,
   id_stand VARCHAR(50),
   id_scene VARCHAR(50),
   id_attraction VARCHAR(50),
   PRIMARY KEY(id_reservation),
   FOREIGN KEY(date_reservation) REFERENCES crenaux(date_reservation),
   FOREIGN KEY(id_client) REFERENCES client(id_client),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(id_scene) REFERENCES scene(id_scene),
   FOREIGN KEY(id_attraction) REFERENCES attraction(id_attraction)
);

CREATE TABLE vend(
   id_stand VARCHAR(50),
   id_produit VARCHAR(50),
   PRIMARY KEY(id_stand, id_produit),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(id_produit) REFERENCES produit(id_produit)
);

CREATE TABLE possède(
   id_prestataire VARCHAR(50),
   id_emplacement VARCHAR(50),
   PRIMARY KEY(id_prestataire, id_emplacement),
   FOREIGN KEY(id_prestataire) REFERENCES prestataire(id_prestataire),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement)
);

CREATE TABLE Asso_18(
   id_stand VARCHAR(50),
   date_reservation DATETIME,
   PRIMARY KEY(id_stand, date_reservation),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(date_reservation) REFERENCES crenaux(date_reservation)
);

CREATE TABLE Asso_19(
   id_scene VARCHAR(50),
   date_reservation DATETIME,
   PRIMARY KEY(id_scene, date_reservation),
   FOREIGN KEY(id_scene) REFERENCES scene(id_scene),
   FOREIGN KEY(date_reservation) REFERENCES crenaux(date_reservation)
);

CREATE TABLE Asso_20(
   id_attraction VARCHAR(50),
   date_reservation DATETIME,
   PRIMARY KEY(id_attraction, date_reservation),
   FOREIGN KEY(id_attraction) REFERENCES attraction(id_attraction),
   FOREIGN KEY(date_reservation) REFERENCES crenaux(date_reservation)
);

CREATE TABLE accueil(
   id_scene VARCHAR(50),
   id_intervenant VARCHAR(50),
   horaire DATETIME,
   PRIMARY KEY(id_scene, id_intervenant),
   FOREIGN KEY(id_scene) REFERENCES scene(id_scene),
   FOREIGN KEY(id_intervenant) REFERENCES intervenant(id_intervenant)
);
