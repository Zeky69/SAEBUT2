DROP TABLE if exists accueil CASCADE;
DROP TABLE if exists possède CASCADE;
DROP TABLE if exists vend CASCADE;
DROP TABLE if exists reservation CASCADE;
DROP TABLE if exists stand CASCADE;
DROP TABLE if exists attraction CASCADE;
DROP TABLE if exists scene CASCADE;
DROP TABLE if exists disponibilite CASCADE;
DROP TABLE if exists taggue CASCADE;

DROP TABLE if exists prestataire CASCADE;
DROP TABLE if exists client CASCADE;
DROP TABLE if exists produit CASCADE;
DROP TABLE if exists intervenant CASCADE;
DROP TABLE if exists batiment CASCADE;
DROP TABLE if exists emplacement CASCADE;
DROP TABLE if exists type CASCADE;
DROP TABLE if exists crenaux CASCADE;
DROP TABLE if exists tags CASCADE;
drop table IF EXISTS droits_de_menus cascade;
DROP TABLE IF EXISTS ELEMENTS_DE_MENU CASCADE;
DROP TABLE IF EXISTS MENUS CASCADE;
DROP TABLE IF EXISTS DROITS_DE_GROUPES CASCADE;
DROP TABLE IF EXISTS DROITS CASCADE;
drop table IF EXISTS mots_de_passe_utilisateurs cascade;
DROP TABLE IF EXISTS JOURNAUX_UTILISATEURS CASCADE;
drop table if exists utilisateurs cascade;
drop table IF EXISTS groupes cascade;

CREATE TABLE GROUPES(
    Id SERIAL PRIMARY KEY,
    Groupe VARCHAR(255)
);

CREATE TABLE UTILISATEURS (
    User_Id varchar(50) PRIMARY KEY,
    FIRST_NAME VARCHAR(255),
    LAST_NAME VARCHAR(255),
    email VARCHAR(255),
    Date_Created TIMESTAMP,
    Group_Id INTEGER REFERENCES GROUPES(Id)
);

CREATE TABLE MOTS_DE_PASSE_UTILISATEURS (
    Id SERIAL PRIMARY KEY,
    User_Id varchar(50) REFERENCES UTILISATEURS(User_Id),
    Password VARCHAR(255)
);

CREATE TABLE JOURNAUX_UTILISATEURS (
    Id SERIAL PRIMARY KEY,
    User_Id varchar(50) REFERENCES UTILISATEURS(User_Id),
    Date_Time TIMESTAMP,
    Event VARCHAR(255)
);

CREATE TABLE DROITS(
    Id SERIAL PRIMARY KEY,
    Right_Name VARCHAR(255)
);

CREATE TABLE DROITS_DE_GROUPES(
    Id SERIAL PRIMARY KEY,
    Group_Id INTEGER REFERENCES GROUPES(Id),
    Right_Id INTEGER REFERENCES DROITS(Id)
); -- On peut avoir plusieurs droits pour un element (ex : le menu accueil visible par tous)

CREATE TABLE MENUS(
    Id SERIAL PRIMARY KEY,
    Nom_Menu VARCHAR(255) NOT NULL,
    Ordre_Affichage INTEGER NOT NULL
);

CREATE TABLE ELEMENTS_DE_MENU(
    Id SERIAL PRIMARY KEY,
    Nom_Element VARCHAR(255) NOT NULL,
    Ordre_Affichage INTEGER NOT NULL,
    Lien VARCHAR(255) NOT NULL,
    Menu_ID INTEGER REFERENCES MENUS(Id) ON DELETE CASCADE
);

CREATE TABLE DROITS_DE_MENUS(
    Id SERIAL PRIMARY KEY,
    Group_Id INTEGER NOT NULL REFERENCES GROUPES(Id),
    Menu_ID INTEGER REFERENCES MENUS(Id) ON DELETE CASCADE
);

CREATE TABLE produit(
   id_produit VARCHAR(50),
   nom VARCHAR(50),
   prix NUMERIC(5,2),
   stock INT,
   PRIMARY KEY(id_produit)
);

CREATE TABLE type(
   id_type VARCHAR(50),
   libelle VARCHAR(50),
   PRIMARY KEY(id_type)
);

CREATE TABLE crenaux(
   date_reservation timestamp,
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
   id_user varchar(50) NOT NULL,
   PRIMARY KEY(id_prestataire),
   FOREIGN KEY(id_user) REFERENCES UTILISATEURS(User_Id)
);



CREATE TABLE emplacement(
    id_emplacement VARCHAR(50),
    nom VARCHAR(50),
    description VARCHAR(255),
    posx DECIMAL(24,17),
    posy DECIMAL(24,17),
    posz DECIMAL(24,17),
    rotationx INT,
    matricePoints JSON,
    batiment_id VARCHAR(50),
    PRIMARY KEY(id_emplacement)
);


CREATE TABLE batiment(
     id_batiment VARCHAR(50),
     description VARCHAR(255),
     nom VARCHAR(50),
     name VARCHAR(50),
     status VARCHAR(50),
     posx DECIMAL(24,17),
     posy DECIMAL(24,17),
     posz DECIMAL(24,17),
     rota DECIMAL(24,17),
     utilisateur VARCHAR(50),
     PRIMARY KEY(id_batiment),
     id_emplacement VARCHAR(50) NOT NULL UNIQUE,
     FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement)
);




CREATE TABLE reservation(
   id_reservation VARCHAR(50),
   id_emplacement VARCHAR(50) NOT NULL,
   date_reservation timestamp NOT NULL,
   id_client VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_reservation),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(date_reservation) REFERENCES crenaux(date_reservation),
   FOREIGN KEY(id_client) REFERENCES UTILISATEURS(User_Id)
);

CREATE TABLE stand(
   id_stand VARCHAR(50),
   description VARCHAR(50),
   id_emplacement VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_stand),
   UNIQUE(id_emplacement),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement)
);

CREATE TABLE scene(
   id_scene VARCHAR(50),
   description VARCHAR(50),
   id_emplacement VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_scene),
   UNIQUE(id_emplacement),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement)
);

CREATE TABLE attraction(
   id_attraction VARCHAR(50),
   description VARCHAR(255),
   id_emplacement VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_attraction),
   UNIQUE(id_emplacement),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement)
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

CREATE TABLE accueil(
   id_scene VARCHAR(50),
   id_intervenant VARCHAR(50),
   horaire timestamp,
   PRIMARY KEY(id_scene, id_intervenant),
   FOREIGN KEY(id_scene) REFERENCES scene(id_scene),
   FOREIGN KEY(id_intervenant) REFERENCES UTILISATEURS(User_Id)
);

CREATE TABLE disponibilite(
   id_emplacement VARCHAR(50),
   date_reservation timestamp,
   PRIMARY KEY(id_emplacement, date_reservation),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(date_reservation) REFERENCES crenaux(date_reservation)
);

CREATE TABLE taggue(
   id_emplacement VARCHAR(50),
   id_tag VARCHAR(50),
   PRIMARY KEY(id_emplacement, id_tag),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(id_tag) REFERENCES tags(id_tag)
);










