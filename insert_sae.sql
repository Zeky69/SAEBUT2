INSERT INTO type VALUES('1', 'Restaurant' ,'restaurant.png'),
                       ('2', 'Attraction','coaster.png'),
                      ('3', 'Scene','stadium.png'),
                       ('4', 'Stand' , 'tent.png'),
                      ('5', 'Boutique' ,'tent.png'),
                      ('6', 'Toilettes','toilets.png');



INSERT INTO ETAT (Etat_libelle) VALUES ('en attente'), ('accepté'), ('refusé');



--INSERT INTO toilette VALUES ( 'c8511a54-441b-43b1-b888-5d261f853924',
--                             'descriptiion toillette 1: 2 toilette Femme, 1 toilette Personne mobilité réduite', 'toilette 1', 'bat_6_wc',-126.34925842285156, 6.462428092956543, 49.19313430786133, 0 ),
--                            ('f281672c-c7c8-4ad2-808f-dfd67138c701', 'description toilette 2', 'toilette 2', 'bat_6_wc1', -116.06807708740234, 6.462428092956543, -32.968910217285156, 0),
--                            ('e4abaf9f-e1bf-4f76-8cd8-0cfbee71e486','description toilette 3', 'toilette 3', 'bat_6_wc2', 27.999588012695312, 6.462428092956543 , -32.968910217285156, 0),
--                            ('fa35a778-6f57-44f2-8915-cea39caa1f33', 'description toilette 4', 'toilette 4', 'bat_6_wc3', 114.55597686767578, 6.462428092956543, 40.598480224609375, 0);


--INSERT INTO scene VALUES ('9fcbe75a-2918-4fbd-a558-dc994100f656', 'description scene', 'stadium 1', 'bat_3_confer', -119.60863494873047, 11.881292343139648, 101.35678100585938, 1.570796461153735);




INSERT INTO groupes VALUES  (1, 'groupe admin'),
                            (2, 'groupe prestataire'),
                            (3, 'groupe user');

INSERT INTO UTILISATEURS(FIRST_NAME,LAST_NAME,email,Date_Created,Group_Id) VALUES('fnAdmin', 'lnAdmin', 'admin@admin.com',now(),1),
                              ( 'fnUser', 'lnUser', 'test@test.com',now(),3),
                              ('fnPresta', 'lnPresta', 'test2@test2.com' ,now(),2);

INSERT INTO mots_de_passe_utilisateurs(User_Id,Password) VALUES(1,'mdpAdmin'),
                                             (2,'mdpUser'),
                                             (3,'mdpUser2');

INSERT INTO prestataire( description, nom, id_user, etat_id) VALUES ('prestataire qui prestate','prestatata','3',2);


INSERT INTO tags VALUES ('1', 'accessible handicapé'),
                        ('2', 'wifi'),
                        ('3', 'point d eau'),
                        ('4', 'surchargé'),
                        ('5', 'modéré'),
                        ('6', 'libre');

INSERT INTO droits VALUES   ('1', 'base'),
                            ('2', 'gestion dune page'),
                            ('3', 'gestion de tout'),
                            ('4', 'affichage user');



INSERT INTO UTILISATEURS(FIRST_NAME, LAST_NAME, email, Date_Created, Group_Id) VALUES
('John', 'Doe', 'john.doe@example.com', CURRENT_TIMESTAMP, 2),
('Jane', 'Smith', 'jane.smith@example.com', CURRENT_TIMESTAMP, 2),
('Bob', 'Johnson', 'bob.johnson@example.com', CURRENT_TIMESTAMP, 2);

INSERT INTO mots_de_passe_utilisateurs(User_Id, Password) VALUES
((SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'John' AND LAST_NAME = 'Doe'), 'password'),
((SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Jane' AND LAST_NAME = 'Smith'), 'password'),
((SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Bob' AND LAST_NAME = 'Johnson'), 'password');


INSERT INTO prestataire ( description, nom, id_user, etat_id,page_info ,photo_profil) VALUES
('admin','belforaine', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'fnAdmin' AND LAST_NAME = 'lnAdmin'),2,NULL,NULL),
('Prestataire Description de macdonald', 'Mcdonald', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'John' AND LAST_NAME = 'Doe'), 2,'<p>Ca marche de zinzin</p>','macdo.jpeg'),
('Prestataire Description de pixar', 'Pixar', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Jane' AND LAST_NAME = 'Smith'), 2,NULL,'Disnet.jpeg'),
('Prestataire Description de disney', 'Disney', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Bob' AND LAST_NAME = 'Johnson'), 2 ,NULL,'pixar.jpg');


INSERT INTO emplacement VALUES ('37f09601-f3e5-4707-8ba0-bedd6a0f8710', 'emp_test', 'lsmdmlq', 3.01549922724575500, 10.00000000000000000, 3.42965139680906360, 0, '{"matricepoints":[[3.697214350069089,2.1904708319286925],[2.07408378521734,2.351403372822247],[1.6232132855265036,5.221367018757306],[3.9857703648493725,5.19454492860838]]}'),
                               ('03877ad4-d5cc-442b-9d8c-cf21bf964f58','emp_scnee', 'dslkqslkdmlq' , 4.98128444846202000,10.00000000000000000,-9.62197766967598500,0, '{"matricepoints":[[6.456524693021493,-11.247396332700887],[3.444727705641526,-11.649727684934774],[2.326571094499741,-7.0095060891528504],[6.2220740559837395,-6.955861908854999]]}')
        ,('07e1d974-66f4-4e1f-bbbe-4efb39b4f44f', 'emp_toillee', 'lsdkqml', -0.72853483217727440,10.00000000000000000,-6.07609735198799700,0, '{"matricepoints":[[0.18042506184201557,-11.005997521360555],[-2.0198346796007627,-11.220574242551962],[-2.236254173126895,1.7076732092480285],[0.2525645680151456,1.1444093161028235]]}' );


INSERT INTO batiment VALUES ( '251fe0ba-c541-49fc-98b9-2bcc9057a52e','description scene', 'stadium 1', 'bat_3_confer', 'accepted', 4.98128444846202000,10.00000000000000000,-9.62197766967598500,0,3 ,null,3,'03877ad4-d5cc-442b-9d8c-cf21bf964f58'),
                            ('de6255e4-3453-4989-8831-c8b2b102c99a', 'description toilette 2', 'toilette 2', 'bat_6_wc1', 'accepted',-0.72853483217727440,10.00000000000000000,-6.07609735198799700,0, 3, null,6, '07e1d974-66f4-4e1f-bbbe-4efb39b4f44f');

--INSERT INTO toilette VALUES ('f281672c-c7c8-4ad2-808f-dfd67138c701','de6255e4-3453-4989-8831-c8b2b102c99a');



INSERT INTO event VALUES ('1', 'premier concert', 'description event 1','251fe0ba-c541-49fc-98b9-2bcc9057a52e', 'red', 'acepted', '2024-06-01T12:30:00', '2024-06-01T14:30:00',1),
                         ('2',  'Premiere lan', 'description event 2', '251fe0ba-c541-49fc-98b9-2bcc9057a52e', 'blue', 'acepted', '2024-06-01T22:00:00', '2024-06-02T12:00:00',1),
                         ('3', 'deuxieme concert', 'description event 3',  '251fe0ba-c541-49fc-98b9-2bcc9057a52e', 'green', 'acepted', '2024-06-03T14:00:00', '2024-06-03T16:00:00',2);



INSERT INTO categorie_produit(libelle_categorie,description,image) VALUES
    ('Goodies', 'Des objets uniques qui ajoutent une touche de magie à votre quotidien.','goodies.png'),
    ('Vêtements', 'Exprimez votre style avec nos vêtements tendance et originaux.','vetement.png'),
    ('Peluches', 'Adoptez des compagnons doux et câlins qui éveilleront votre enfant intérieur.','peluches.png'),
    ('Accessoires', 'Les petits détails qui font la différence : accessoires audacieux pour des moments mémorables.','accessoires.jpg');
    
    select * from categorie_produit;

select * from categorie_produit;

-- Ajout des produits pour la catégorie 'Goodies'
INSERT INTO produit (nom, prix, stock, categorie_id,photo) VALUES
    ('Stylo magique', 2.99, 100, 1,'stylo_magique.png'),
    ('Tasse enchantée', 9.99, 50, 1,'tasse_magique.png'),
    ('Porte-clés lumineux', 4.49, 75, 1,'porte_cle_lumineux.png'),
    ('Carnet de notes féerique', 6.99, 60, 1,'carnet_note.png'),    
	('Stylo en métal gravé', 5.99, 50, 1,'stylo_grave.png'),
    ('Mug isotherme avec couvercle', 14.99, 40, 1,'mug.png');


-- Ajout des produits pour la catégorie 'Vêtements'
INSERT INTO produit (nom, prix, stock, categorie_id,photo) VALUES
    ('T-shirt graphique', 19.99, 30, 2,'t-shirt-graphique.png'),
    ('Sweat à capuche confort', 39.99, 20, 2,'sweat-capuche.png'),
    ('Chaussettes colorées', 8.99, 50, 2,'chaussette-coloré.png'),
    ('Casquette brodée', 14.99, 40, 2,'casquette-brode.png');

-- Ajout des produits pour la catégorie 'Peluches'
INSERT INTO produit (nom, prix, stock, categorie_id,photo) VALUES
    ('Peluche licorne magique', 29.99, 15, 3,'peluche_licorne.png'),
    ('Ours en peluche câlin', 24.99, 20, 3,'ours_calin.png'),
    ('Doudou éléphant doux', 19.99, 25, 3,'peluche_elephan.png'),
    ('Peluche dragon rigolo', 34.99, 12, 3,'peluche_dragon.png'),
	('Peluche ourson géant', 39.99, 20, 3,'peluche_ourson.png'),
    ('Peluche chaton réaliste', 16.99, 35, 3,'peluche_chaton.png');


-- Ajout des produits pour la catégorie 'Accessoires'
INSERT INTO produit (nom, prix, stock, categorie_id, photo) VALUES
    ('Coque de téléphone artistique', 12.99, 40, 4,'coque_telephone.png'),
    ('Sac à dos tendance', 29.99, 25, 4,'sac-a-dos.png'),
    ('Bracelet en cuir élégant', 16.99, 35, 4,'bracelet-cuir.png'),
    ('Étui à lunettes original', 8.49, 50, 4,'etui.png'),
    ('Bracelet en argent avec pendentif', 29.99, 25, 4,'bracelet-argent.png');




