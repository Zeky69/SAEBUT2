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

	INSERT INTO mots_de_passe_utilisateurs(User_Id,Password) VALUES(1,'$2b$10$i5g1xQgrDAbFT.I6Fi6PVubx9ciGHKk7FRaAJCMEoefhAmd2NKiV6'),
		                                     (2,'$2b$10$0uVsqG09RJDqfHu0QeJE..552NrRvAKh5.ypknPBCbYbErOaq6D8a'),
		                                     (3,'$2b$10$Q6WR1IlxWBcityVVNbO2p.ehl3vuLtRKnN2klfpSR6xQpASf9cIIu');


INSERT INTO prestataire( description, nom, id_user, etat_id ,photo_profil) VALUES ('Drake le meilleur chanteur','Drake','3',2,'drake.jpeg');

INSERT INTO type_service(nom) VALUES ('Commentaire'),
                        ('Boutique');

INSERT INTO tags VALUES ('1', 'accessible handicapé'),
                        ('2', 'wifi'),
                        ('3', 'point d eau'),

                        /* tags pour gérer l'affluence (s'attribuent automatiquement en fct du nombre de réservation*/
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
((SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'John' AND LAST_NAME = 'Doe'), '$2b$10$H0zB1Ub0YiHQXu.pstzZOescgnHpZLAjNTAXfo/CiOuCnuFse/4ha'),
((SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Jane' AND LAST_NAME = 'Smith'), '$2b$10$H0zB1Ub0YiHQXu.pstzZOescgnHpZLAjNTAXfo/CiOuCnuFse/4ha'),
((SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Bob' AND LAST_NAME = 'Johnson'), '$2b$10$H0zB1Ub0YiHQXu.pstzZOescgnHpZLAjNTAXfo/CiOuCnuFse/4ha');


INSERT INTO prestataire ( description, nom, id_user, etat_id,page_info ,photo_profil) VALUES
('admin','belforaine', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'fnAdmin' AND LAST_NAME = 'lnAdmin'),2,NULL,NULL),
('Prestataire Description de macdonald', 'Mcdonald', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'John' AND LAST_NAME = 'Doe'), 2,'<p style="text-align:justify;">Bienvenue chez McDonalds, l endroit où la convivialité et la gourmandise se rencontrent pour créer des moments inoubliables ! Notre histoire est celle dune passion pour la qualité, la diversité et linnovation culinaire, et chaque visite chez McDonalds est une expérience exceptionnelle.<br><br>Découvrez un monde de saveurs exquises, où nos menus variés captivent tous les palais. Des classiques emblématiques aux créations audacieuses, nous sommes fiers de vous offrir un éventail de délices conçus pour satisfaire toutes les envies. Chez McDonalds, nous pensons que chaque repas devrait être une célébration de la bonne cuisine, partagée avec ceux que vous aimez.<br><br>Nos restaurants sont bien plus que des lieux de restauration rapide. Ce sont des espaces chaleureux où se mêlent l arôme alléchant de nos produits fraîchement préparés et l atmosphère accueillante de nos établissements. Que ce soit pour une pause décontractée en solo, un déjeuner entre collègues ou un dîner en famille, McDonalds est l endroit idéal pour créer des souvenirs autour d un bon repas.<br><br>En choisissant McDonald s, vous rejoignez une communauté mondiale qui célèbre la diversité, l innovation et l engagement envers un monde meilleur. Nous nous efforçons constamment d adopter des pratiques durables et responsables, tout en participant activement à des initiatives sociales pour contribuer au bien-être de nos communautés.<br><br>Nous sommes ravis de vous accueillir dans notre univers où la qualité, le plaisir et la responsabilité se rencontrent. Chez McDonald s, chaque moment est une célébration de la vie, et nous sommes impatients de partager cette expérience unique avec vous. Bon appétit et bienvenue chez McDonald s, là où chaque instant est délicieusement mémorable !','macdo.jpeg'),
('Prestataire Description de pixar', 'Pixar', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Jane' AND LAST_NAME = 'Smith'), 2,NULL,'pixar.jpg'),
('Prestataire Description de disney', 'Disney', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Bob' AND LAST_NAME = 'Johnson'), 2 ,NULL,'Disnet.jpeg');



INSERT INTO categorie_produit(libelle_categorie,description,image) VALUES
    ('Goodies', 'Des objets uniques qui ajoutent une touche de magie à votre quotidien.','goodies.png'),
    ('Vêtements', 'Exprimez votre style avec nos vêtements tendance et originaux.','vetement.png'),
    ('Peluches', 'Adoptez des compagnons doux et câlins qui éveilleront votre enfant intérieur.','peluches.png'),
    ('Accessoires', 'Les petits détails qui font la différence : accessoires audacieux pour des moments mémorables.','accessoires.jpg');

    select * from categorie_produit;

select * from categorie_produit;

INSERT INTO service (id_type_service, id_prestataire, etat) VALUES
	(1,1,true),(1,2,true),(1,3,true),(1,4,true),(1,5,true),(2,1,true),(2,2,true),(2,3,true);

-- Ajout des produits pour la catégorie 'Goodies'
INSERT INTO produit (nom, prix, stock, categorie_id,photo,prestataire_id) VALUES
    ('Stylo magique', 2.99, 100, 1,'stylo_magique.png',4),
    ('Tasse enchantée', 9.99, 50, 1,'tasse_magique.png',4),
    ('Porte-clés lumineux', 4.49, 75, 1,'porte_cle_lumineux.png',4),
    ('Carnet de notes féerique', 6.99, 60, 1,'carnet_note.png',4),
	('Stylo en métal gravé', 5.99, 50, 1,'stylo_grave.png',4),
    ('Mug isotherme avec couvercle', 14.99, 40, 1,'mug.png',4);


-- Ajout des produits pour la catégorie 'Vêtements'
INSERT INTO produit (nom, prix, stock, categorie_id,photo,prestataire_id) VALUES
    ('T-shirt graphique', 19.99, 30, 2,'t-shirt-graphique.png',1),
    ('Sweat à capuche confort', 39.99, 20, 2,'sweat-capuche.png',2),
    ('Chaussettes colorées', 8.99, 50, 2,'chaussette-coloré.png',2),
    ('Casquette brodée', 14.99, 40, 2,'casquette-brode.png',3);

-- Ajout des produits pour la catégorie 'Peluches'
INSERT INTO produit (nom, prix, stock, categorie_id,photo,prestataire_id) VALUES
    ('Peluche licorne magique', 29.99, 15, 3,'peluche_licorne.png',2),
    ('Ours en peluche câlin', 24.99, 20, 3,'ours_calin.png',1),
    ('Doudou éléphant doux', 19.99, 25, 3,'peluche_elephan.png',3),
    ('Peluche dragon rigolo', 34.99, 12, 3,'peluche_dragon.png',3),
	('Peluche ourson géant', 39.99, 20, 3,'peluche_ourson.png',3),
    ('Peluche chaton réaliste', 16.99, 35, 3,'peluche_chaton.png',2);


-- Ajout des produits pour la catégorie 'Accessoires'
INSERT INTO produit (nom, prix, stock, categorie_id, photo,prestataire_id) VALUES
    ('Coque de téléphone artistique', 12.99, 40, 4,'coque_telephone.png',1),
    ('Sac à dos tendance', 29.99, 25, 4,'sac-a-dos.png',2),
    ('Bracelet en cuir élégant', 16.99, 35, 4,'bracelet-cuir.png',3),
    ('Étui à lunettes original', 8.49, 50, 4,'etui.png',4),
    ('Bracelet en argent avec pendentif', 29.99, 25, 4,'bracelet-argent.png',2);
    
    
INSERT INTO billet(title,description,price,day,path) VALUES
('Billet Basic','Profitez de la magie de Belforaine toute une journée.',24.99,1,'billet_basic.png'),
('Billet Fast','Profitez de la magie de Belforaine toute une journée avec un accès prioritaire aux attractions.',34.99,1,'billet_fast.png'),
('Billet Premium','Profitez de la magie de Belforaine pendant 2 jours avec un accès prioritaire aux attractions et des goodies offerts à l`entrée.',59.99,2,'billet_premium.png');


INSERT INTO sousBillet (subId , id_billet , subtitle) VALUES
(1,1,'Adulte'),
(2,1,'Enfant'),
(1,2,'Adulte'),
(2,2,'Enfant'),
(1,3,'Adulte'),
(2,3,'Enfant');

INSERT INTO date_belforaine (date_evenement) VALUES
('2024-01-15'),
('2024-01-16'),
('2024-01-17');





INSERT INTO commande (id_user,date_commande) VALUES
(2,now());




select * from emplacement;

INSERT INTO ligneCommandeBillet (uuid,id_commande,id_billet,subId,nom,prenom) VALUES
('151',1,1,2,'Zekeriya','Akburak'),
('15415',1,2,1,'Mhammed','Akburak'),
('5415',1,3,1,'Enzo','LeRaptor');

INSERT INTO ligneCommandeArticle(id_commande , id_produit ,valide, quantite) VALUES
(1,1,false,5);

INSERT INTO emplacement (id_emplacement,id_type,nom,description,matricePoints,prestataire_id,use_Resa,accepted) VALUES
('1','1','Restaurant 1','Description Restaurant 1','{"matricepoints":[[47.748075302987075,6.802453448783919],[47.74813481828826,6.802359606875716],[47.74827368705965,6.802426636810158],[47.74818711955734,6.802678669363586],[47.748075302987075,6.802453448783919]]}',3,false,true),
('2','2','Attraction 1','Description Attraction 1','{"matricepoints":[[47.748075302987075,6.802453448783919],[47.74813481828826,6.802359606875716],[47.74827368705965,6.802426636810158],[47.74818711955734,6.802678669363586],[47.748075302987075,6.802453448783919]]}',3,true,true),
('3','3','Scene 1','Description Scene 1','{"matricepoints":[[47.748075302987075,6.802453448783919],[47.74813481828826,6.802359606875716],[47.74827368705965,6.802426636810158],[47.74818711955734,6.802678669363586],[47.748075302987075,6.802453448783919]]}',4,false,true),
('4','4','Stand 1','Description Stand 1','{"matricepoints":[[47.748075302987075,6.802453448783919],[47.74813481828826,6.802359606875716],[47.74827368705965,6.802426636810158],[47.74818711955734,6.802678669363586],[47.748075302987075,6.802453448783919]]}',4,false,true);


INSERT INTO contenuhomepage VALUES (1,'Découvrez un monde où LANs survoltés, aventures en réalité virtuelle époustouflantes, conférences inspirantes et divertissement sans fin fusionnent. Plongez dans la magie que nous réserve le futur, le tout dans une seule destination. Belforaine, où le futur devient réalité, et le plaisir est infini !')