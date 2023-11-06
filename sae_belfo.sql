DROP TABLE if exists accueil;
DROP TABLE if exists possède;
DROP TABLE if exists vend;
DROP TABLE if exists reservation;
DROP TABLE if exists emplacement;
DROP TABLE if exists attraction;
DROP TABLE if exists scene;
DROP TABLE if exists stand;
DROP TABLE if exists prestataire;
DROP TABLE if exists client;
DROP TABLE if exists utilisateur;
DROP TABLE if exists produit;
DROP TABLE if exists intervenant;
DROP TABLE if exists type;
DROP TABLE if exists crenaux;
DROP TABLE if exists tags;
DROP TABLE if exists disponibilite;
DROP TABLE if exists taggue;

CREATE TABLE utilisateur(
   id_user VARCHAR(50),
   permission INT,
   login VARCHAR(50),
   email VARCHAR(50),
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
   prix NUMERIC(5,2),
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
   id_type VARCHAR(50) NOT NULL,
   id_user INT NOT NULL,
   PRIMARY KEY(id_prestataire),
   FOREIGN KEY(id_type) REFERENCES type(id_type),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user)
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
   id_emplacement VARCHAR(50) NOT NULL,
   date_reservation timestamp NOT NULL,
   id_client VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_reservation),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement),
   FOREIGN KEY(date_reservation) REFERENCES crenaux(date_reservation),
   FOREIGN KEY(id_client) REFERENCES client(id_client)
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
   FOREIGN KEY(id_intervenant) REFERENCES intervenant(id_intervenant)
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

INSERT INTO type VALUES('1', 'Stand'),
                      ('2', 'Scene'),
                      ('3', 'Attraction'),
                      ('4', 'Parking'),
                      ('5', 'Toilettes');


INSERT INTO utilisateur VALUES('1', 1, 'admin', 'admin@admin.com','admin'),
                              ('2', 0, 'user', 'test@test.com','user'),
                              ('3', 0, 'user2', 'test2@test2.com' ,'user2');

INSERT INTO client VALUES('1', 'DUPONT', 'Jean', '1990-01-01', 2);

INSERT INTO prestataire VALUES ('1', 'prestataire qui prestate','prestatata','3','3');

INSERT INTO emplacement VALUES ('1', 'emplacement 1', '1'),
                                ('2', 'emplacement 2', '2'),
                                ('3', 'emplacement 3', '3');

INSERT INTO tags VALUES ('1', 'accessible handicapé'),
                        ('2', 'wifi'),
                        ('3', 'point d eau'),

                        /* tags pour gérer l'affluence (s'attribuent automatiquement en fct du nombre de réservation*/
                        ('4', 'surchargé'),
                        ('5', 'modéré'),
                        ('6', 'libre');








