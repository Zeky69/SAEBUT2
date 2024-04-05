DROP TABLE if exists contact CASCADE;

DROP TABLE if exists commentaire CASCADE;

DROP TABLE if exists possède CASCADE;

DROP TABLE if exists possede CASCADE;

DROP TABLE if exists vend CASCADE;

DROP TABLE if exists reservation CASCADE;

DROP TABLE if exists stand CASCADE;

DROP TABLE if exists attraction CASCADE;

DROP TABLE if exists event CASCADE;

DROP TABLE if exists toilette CASCADE;

DROP TABLE if exists visiteurSite CASCADE;

DROP TABLE if exists disponibilite CASCADE;

DROP TABLE if exists taggue CASCADE;

DROP TABLE if exists prestataire CASCADE;

DROP TABLE if exists type_service CASCADE;

DROP TABLE if exists service CASCADE;

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

DROP TABLE IF EXISTS categorie_produit CASCADE;

drop table IF EXISTS mots_de_passe_utilisateurs cascade;

DROP TABLE IF EXISTS JOURNAUX_UTILISATEURS CASCADE;

drop table if exists utilisateurs cascade;

drop table IF EXISTS groupes cascade;

drop table IF EXISTS ETAT cascade;

DROP TABLE IF EXISTS billet cascade;

DROP TABLE IF EXISTS sousBillet CASCADE;

DROP TABLE IF EXISTS commande CASCADE;

DROP TABLE IF EXISTS ligneCommandeArticle CASCADE;

DROP TABLE IF EXISTS ligneCommandeBillet CASCADE;

DROP TABLE IF EXISTS date_belforaine CASCADE;

DROP TABLE IF EXISTS contenuHomePage CASCADE;

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
   Unique(user_id, Password)
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
   PRIMARY KEY (Group_Id, Right_Id)
);

-- On peut avoir plusieurs droits pour un element (ex : le menu accueil visible par tous)
CREATE TABLE categorie_produit(
   id_categorie SERIAL,
   libelle_categorie VARCHAR(50),
   description VARCHAR(250),
   image VARCHAR(50),
   PRIMARY KEY(id_categorie)
);

CREATE TABLE type(
   id_type VARCHAR(50),
   libelle VARCHAR(50),
   marker VARCHAR(50),
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

CREATE TABLE type_service(
   id_type_service SERIAL,
   nom VARCHAR(255),
   PRIMARY KEY(id_type_service)
);

CREATE TABLE service(
   id_service SERIAL,
   id_type_service INT,
   id_prestataire INT,
   etat BOOL,
   PRIMARY KEY(id_service),
   FOREIGN KEY(id_prestataire) REFERENCES prestataire(id_prestataire) ON DELETE CASCADE,
   FOREIGN KEY(id_type_service) REFERENCES type_service(id_type_service),
   UNIQUE(id_prestataire, id_type_service)
);

CREATE TABLE produit(
   id_produit SERIAL,
   nom VARCHAR(50),
   prix NUMERIC(5, 2),
   stock INT,
   photo TEXT,
   categorie_id INT,
   prestataire_id INT NOT NULL,
   FOREIGN KEY(categorie_id) REFERENCES categorie_produit(id_categorie),
   FOREIGN KEY (prestataire_id) REFERENCES prestataire(id_prestataire) ON DELETE CASCADE,
   PRIMARY KEY(id_produit)
);

CREATE TABLE emplacement(
   id_emplacement VARCHAR(50),
   id_type VARCHAR(50),
   nom VARCHAR(50),
   description TEXT,
   matricePoints JSON,
   prestataire_id INT,
   use_Resa BOOLEAN default true,
   accepted BOOLEAN default false,
   FOREIGN KEY (id_type) REFERENCES type(id_type),
   FOREIGN KEY (prestataire_id) REFERENCES prestataire(id_prestataire),
   PRIMARY KEY(id_emplacement)
);

--     CREATE TABLE batiment(
--          id_batiment VARCHAR(50),
--          description VARCHAR(255),
--          nom VARCHAR(50),
--          name VARCHAR(50),
--          status VARCHAR(50),
--          posx DECIMAL(24,17),
--          posy DECIMAL(24,17),
--          posz DECIMAL(24,17),
--          rota DECIMAL(24,17),
--          prestataire_id INT NOT NULL,
--          image_path TEXT,
--          type_id VARCHAR(50),
--          id_emplacement VARCHAR(50) NOT NULL UNIQUE,
--          use_Resa BOOLEAN default true,
--          PRIMARY KEY(id_batiment),
--          FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
--          FOREIGN KEY(type_id) REFERENCES type(id_type),
--          FOREIGN KEY(prestataire_id) REFERENCES prestataire(id_prestataire)
--     );
CREATE TABLE reservation(
   id_reservation SERIAL,
   id_emplacement VARCHAR(50) NOT NULL,
   id_prestataire INT NOT NULL,
   ouverture timestamp,
   duree varchar(50),
   id_ticket_client VARCHAR(255),
   description VARCHAR(255),
   nom VARCHAR(50),
   color VARCHAR(50),
   status VARCHAR(50),
   PRIMARY KEY(id_reservation),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement)
);

CREATE TABLE event(
   id_event VARCHAR(50),
   description VARCHAR(255),
   nom VARCHAR(50),
   id_emplacement VARCHAR(50) NOT NULL,
   color VARCHAR(50),
   status VARCHAR(50),
   start_date timestamp,
   end_date timestamp,
   id_prestataire INT NOT NULL,
   PRIMARY KEY(id_event),
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

CREATE TABLE taggue(
   id_emplacement VARCHAR(50),
   id_tag VARCHAR(50),
   PRIMARY KEY(id_emplacement, id_tag),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(id_tag) REFERENCES tags(id_tag)
);

CREATE TABLE commentaire(
   id_commentaire SERIAL,
   nom VARCHAR(50),
   id_prestataire INT NOT NULL,
   commentaire TEXT,
   note INT,
   date_commentaire TIMESTAMP,
   PRIMARY KEY(id_commentaire),
   FOREIGN KEY(id_prestataire) REFERENCES prestataire(id_prestataire)
);

CREATE TABLE billet(
   id SERIAL,
   title VARCHAR(100),
   description VARCHAR(255),
   price DECIMAL(5, 2),
   day int,
   path VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE sousBillet(
   subId INT NOT NULL,
   id_billet INT NOT NULL,
   subtitle VARCHAR(100),
   PRIMARY KEY(subId, id_billet),
   FOREIGN KEY(id_billet) REFERENCES billet(id)
);

CREATE TABLE commande(
   id_commande SERIAL,
   id_user INT NOT NULL,
   date_commande TIMESTAMP,
   PRIMARY KEY(id_commande),
   FOREIGN KEY(id_user) REFERENCES UTILISATEURS(User_Id)
);

CREATE TABLE date_belforaine(
   id_date_belforaine SERIAL,
   date_evenement TIMESTAMP,
   PRIMARY KEY(id_date_belforaine)
);

CREATE TABLE ligneCommandeBillet(
   uuid VARCHAR(100) NOT NULL,
   id_commande INT NOT NULL,
   id_billet INT NOT NULL,
   subId INT NOT NULL,
   nom VARCHAR(100),
   prenom VARCHAR(100),
   date DATE NOT NULL DEFAULT CURRENT_DATE,
   PRIMARY KEY(uuid),
   FOREIGN KEY(id_commande) REFERENCES commande(id_commande),
   FOREIGN KEY(id_billet, subId) REFERENCES sousBillet(id_billet, subId)
);

CREATE TABLE ligneCommandeArticle(
   id_commande INT NOT NULL,
   id_produit INT NOT NULL,
   quantite INT NOT NULL,
   valide BOOLEAN NOT NULL,
   PRIMARY KEY(id_commande, id_produit),
   FOREIGN KEY(id_produit) REFERENCES produit(id_produit) ON DELETE CASCADE
);

CREATE TABLE disponibilite(
   id_emplacement VARCHAR(50),
   date_reservation timestamp,
   PRIMARY KEY(id_emplacement, date_reservation),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(date_reservation) REFERENCES crenaux(date_reservation)
);

CREATE TABLE contact(
   id_contact SERIAL PRIMARY KEY,
   nom VARCHAR(255),
   prenom VARCHAR(255),
   email VARCHAR(255),
   objet VARCHAR(255),
   message TEXT,
   date_contact TIMESTAMP
);

CREATE TABLE contenuHomePage(
   id_contenu SERIAL,
   contenu TEXT,
   PRIMARY KEY(id_contenu)
);

CREATE  TABLE visiteurSite(
    id_visiteur SERIAL,
    date_visite TIMESTAMP,
    PRIMARY KEY(id_visiteur)
    );
