    DROP TABLE if exists accueil CASCADE;
    DROP TABLE if exists possède CASCADE;
        DROP TABLE if exists possede CASCADE;
    DROP TABLE if exists vend CASCADE;
    DROP TABLE if exists reservation CASCADE;
    DROP TABLE if exists stand CASCADE;
    DROP TABLE if exists attraction CASCADE;
    DROP TABLE if exists scene CASCADE;
    DROP TABLE if exists event CASCADE;
    DROP TABLE if exists toilette CASCADE;

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
drop table IF EXISTS ETAT cascade;

CREATE TABLE GROUPES(
    Id SERIAL PRIMARY KEY,
    libelle VARCHAR(255)
);

CREATE TABLE ETAT(
	Etat_id SERIAL PRIMARY KEY,
	Etat_libelle VARCHAR(50)
);

    CREATE TABLE UTILISATEURS (
        User_Id SERIAL PRIMARY KEY,
        FIRST_NAME VARCHAR(255),
        LAST_NAME VARCHAR(255),
        email VARCHAR(255),
        Date_Created TIMESTAMP,
        Group_Id INTEGER REFERENCES GROUPES(Id)
    );

    CREATE TABLE MOTS_DE_PASSE_UTILISATEURS (
        Id SERIAL PRIMARY KEY,
        User_Id INT REFERENCES UTILISATEURS(User_Id),
        Password VARCHAR(255),
        Unique(user_id,Password)
    );

    CREATE TABLE JOURNAUX_UTILISATEURS (
        Id SERIAL PRIMARY KEY,
        User_Id INT REFERENCES UTILISATEURS(User_Id),
        Date_Time TIMESTAMP,
        Event VARCHAR(255)
    );

    CREATE TABLE DROITS(
        Id SERIAL PRIMARY KEY,
        Right_Name VARCHAR(255)
    );

CREATE TABLE DROITS_DE_GROUPES(
    Group_Id INTEGER REFERENCES GROUPES(Id),
    Right_Id INTEGER REFERENCES DROITS(Id),
    PRIMARY KEY (Group_Id,Right_Id)
); -- On peut avoir plusieurs droits pour un element (ex : le menu accueil visible par tous)


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
       marker VARCHAR(50),
       PRIMARY KEY(id_type)
    );


    CREATE TABLE tags(
       id_tag VARCHAR(50),
       libelle VARCHAR(50),
       PRIMARY KEY(id_tag)
    );

    CREATE TABLE prestataire(
       id_prestataire SERIAL,
       description VARCHAR(255),
       nom VARCHAR(50),
       id_user INT NOT NULL,
       etat_id INT,
       page_info TEXT,
       photo_profil TEXT,
       PRIMARY KEY(id_prestataire),
       FOREIGN KEY(id_user) REFERENCES UTILISATEURS(User_Id),
       FOREIGN KEY(etat_id) REFERENCES ETAT(etat_id)
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
         prestataire_id INT,
         image_path TEXT,
         type_id VARCHAR(50),
         PRIMARY KEY(id_batiment),
         id_emplacement VARCHAR(50) NOT NULL UNIQUE,
         FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
         FOREIGN KEY(type_id) REFERENCES type(id_type),
         FOREIGN KEY(prestataire_id) REFERENCES prestataire(id_prestataire)
    );




    CREATE TABLE reservation(
        id_reservation SERIAL,
        id_emplacement VARCHAR(50),
        ouverture timestamp,
        duree varchar(50),
        id_client INT,
        PRIMARY KEY(id_reservation),
        FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
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

    CREATE TABLE toilette(
       id_toilette VARCHAR(50),
       description VARCHAR(255),
       nom VARCHAR(50),
       name VARCHAR(50),
       posx DECIMAL(24,17),
       posy DECIMAL(24,17),
       posz DECIMAL(24,17),
       rota DECIMAL(24,17),
       PRIMARY KEY(id_toilette)
    );

    CREATE TABLE scene(
       id_scene VARCHAR(50),
       description VARCHAR(50),
       nom VARCHAR(50),
       name VARCHAR(50),
       posx DECIMAL(24,17),
       posy DECIMAL(24,17),
       posz DECIMAL(24,17),
       rota DECIMAL(24,17),
       PRIMARY KEY(id_scene)
    );


    CREATE TABLE event(
       id_event VARCHAR(50),
       description VARCHAR(255),
       nom VARCHAR(50),
       id_scene VARCHAR(50) NOT NULL,
       color VARCHAR(50),
       status VARCHAR(50),
       start_date timestamp,
       end_date timestamp,
       id_prestataire INT NOT NULL,
       PRIMARY KEY(id_event),
       FOREIGN KEY(id_scene) REFERENCES scene(id_scene)
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

    CREATE TABLE accueil(
       id_scene VARCHAR(50),
       id_intervenant INT,
       horaire timestamp,
       PRIMARY KEY(id_scene, id_intervenant),
       FOREIGN KEY(id_scene) REFERENCES scene(id_scene),
       FOREIGN KEY(id_intervenant) REFERENCES UTILISATEURS(User_Id)
    );

    CREATE TABLE taggue(
       id_emplacement VARCHAR(50),
       id_tag VARCHAR(50),
       PRIMARY KEY(id_emplacement, id_tag),
       FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
       FOREIGN KEY(id_tag) REFERENCES tags(id_tag)
    );
