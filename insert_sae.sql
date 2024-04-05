INSERT INTO type VALUES('1', 'Restaurant' ,'restaurant.png'),
                       ('2', 'Attraction','coaster.png'),
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
('admin','Belforaine', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'fnAdmin' AND LAST_NAME = 'lnAdmin'),2,NULL,'logoWF2W.png'),
('Prestataire Description de macdonald', 'Mcdonald', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'John' AND LAST_NAME = 'Doe'), 2,'<p style="text-align:justify;">Bienvenue chez McDonalds, l endroit où la convivialité et la gourmandise se rencontrent pour créer des moments inoubliables ! Notre histoire est celle dune passion pour la qualité, la diversité et linnovation culinaire, et chaque visite chez McDonalds est une expérience exceptionnelle.<br><br>Découvrez un monde de saveurs exquises, où nos menus variés captivent tous les palais. Des classiques emblématiques aux créations audacieuses, nous sommes fiers de vous offrir un éventail de délices conçus pour satisfaire toutes les envies. Chez McDonalds, nous pensons que chaque repas devrait être une célébration de la bonne cuisine, partagée avec ceux que vous aimez.<br><br>Nos restaurants sont bien plus que des lieux de restauration rapide. Ce sont des espaces chaleureux où se mêlent l arôme alléchant de nos produits fraîchement préparés et l atmosphère accueillante de nos établissements. Que ce soit pour une pause décontractée en solo, un déjeuner entre collègues ou un dîner en famille, McDonalds est l endroit idéal pour créer des souvenirs autour d un bon repas.<br><br>En choisissant McDonald s, vous rejoignez une communauté mondiale qui célèbre la diversité, l innovation et l engagement envers un monde meilleur. Nous nous efforçons constamment d adopter des pratiques durables et responsables, tout en participant activement à des initiatives sociales pour contribuer au bien-être de nos communautés.<br><br>Nous sommes ravis de vous accueillir dans notre univers où la qualité, le plaisir et la responsabilité se rencontrent. Chez McDonald s, chaque moment est une célébration de la vie, et nous sommes impatients de partager cette expérience unique avec vous. Bon appétit et bienvenue chez McDonald s, là où chaque instant est délicieusement mémorable !','macdo.jpeg'),
('Prestataire Description de pixar', 'Pixar', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Jane' AND LAST_NAME = 'Smith'), 2,NULL,'pixar.jpg'),
('Prestataire Description de disney', 'Disney', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Bob' AND LAST_NAME = 'Johnson'), 2 ,NULL,'Disnet.jpeg');



INSERT INTO categorie_produit(libelle_categorie,description,image) VALUES
    ('Goodies', 'Des objets uniques qui ajoutent une touche de magie à votre quotidien.','goodies.png'),
    ('Vêtements', 'Exprimez votre style avec nos vêtements tendance et originaux.','vetement.png'),
    ('Peluches', 'Adoptez des compagnons doux et câlins qui éveilleront votre enfant intérieur.','peluches.png'),
    ('Accessoires', 'Les petits détails qui font la différence : accessoires audacieux pour des moments mémorables.','accessoires.jpg'),
    ('Fast Food', 'Des menus rapides et savoureux pour une pause gourmande.','fastfood.png');

    select * from categorie_produit;

select * from categorie_produit;

INSERT INTO service (id_type_service, id_prestataire, etat) VALUES
	(1,1,true),(1,2,true),(1,3,true),(1,4,true),(1,5,true),(2,1,true),(2,2,true),(2,3,true),(2,4,true);

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
    ('T-shirt graphique', 19.99, 30, 2,'t-shirt-graphique.png',5),
    ('Sweat à capuche confort', 39.99, 20, 2,'sweat-capuche.png',5),
    ('Chaussettes colorées', 8.99, 50, 2,'chaussette-coloré.png',5),
    ('Casquette brodée', 14.99, 40, 2,'casquette-brode.png',5);

-- Ajout des produits pour la catégorie 'Peluches'
INSERT INTO produit (nom, prix, stock, categorie_id,photo,prestataire_id) VALUES
    ('Peluche licorne magique', 29.99, 15, 3,'peluche_licorne.png',1),
    ('Ours en peluche câlin', 24.99, 20, 3,'ours_calin.png',1),
    ('Doudou éléphant doux', 19.99, 25, 3,'peluche_elephan.png',4),
    ('Peluche dragon rigolo', 34.99, 12, 3,'peluche_dragon.png',4),
	('Peluche ourson géant', 39.99, 20, 3,'peluche_ourson.png',1),
    ('Peluche chaton réaliste', 16.99, 35, 3,'peluche_chaton.png',5);


-- Ajout des produits pour la catégorie 'Accessoires'
INSERT INTO produit (nom, prix, stock, categorie_id, photo,prestataire_id) VALUES
    ('Coque de téléphone artistique', 12.99, 40, 4,'coque_telephone.png',4),
    ('Sac à dos tendance', 29.99, 25, 4,'sac-a-dos.png',5),
    ('Bracelet en cuir élégant', 16.99, 35, 4,'bracelet-cuir.png',2),
    ('Étui à lunettes original', 8.49, 50, 4,'etui.png',5),
    ('Bracelet en argent avec pendentif', 29.99, 25, 4,'bracelet-argent.png',5);

-- Ajout de produit fast food
INSERT INTO produit (nom, prix, stock, categorie_id, photo,prestataire_id) VALUES
    ('Menu classique', 9.99, 50, 5,'menu_classique.png',3),
    ('Menu premium', 14.99, 50, 5,'menu_premium.png',3),
    ('belofrite', 2.99, 50, 5,'belofrite.png',3),
    ('beloburger', 4.99, 50, 5,'belofburger.png',3),
    ('belochicken', 6.99, 50, 5,'belofchicken.png',3);

    
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
('2024-04-08'),
('2024-04-09'),
('2024-04-10'),
('2024-04-11'),
('2024-04-12'),
('2024-04-13')
;

INSERT INTO commande (id_user,date_commande) VALUES
(2,now()),
(2,now()),
(2,now()),
(2,now());



INSERT INTO ligneCommandeBillet (uuid,id_commande,id_billet,subId,nom,prenom) VALUES
('151',1,1,2,'Zekeriya','Akburak'),
('15415',1,2,1,'Mhammed','Akburak'),
('5415',1,3,1,'Enzo','LeRaptor');

INSERT INTO ligneCommandeArticle(id_commande , id_produit ,valide, quantite) VALUES
(1,1,false,5),
(1,22,true,1),
(1,21,false,2),
(2,22,true,1),
(2,23,true,2),
(2,24,false,3),
(2,25,true,4),
(2,26,false,5),
(3,3,true,1),
(3,11,true,2),
(3,15,false,3),
(3,18,true,4),
(3,7,false,5),
(4,10,true,1),
(4,2,true,2),
(4,1,false,3),
(4,5,true,4),
(4,13,false,5);



INSERT INTO contenuhomepage VALUES (1,'Découvrez un monde où LANs survoltés, aventures en réalité virtuelle époustouflantes, conférences inspirantes et divertissement sans fin fusionnent. Plongez dans la magie que nous réserve le futur, le tout dans une seule destination. Belforaine, où le futur devient réalité, et le plaisir est infini !');


SELECT email from utilisateurs
JOIN public.commande c on utilisateurs.user_id = c.id_user
JOIN public.lignecommandebillet l on c.id_commande = l.id_commande
WHERE uuid = '151';



SELECT * FROM visiteursite;

INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('635471e4-630f-41fd-9a05-c9d97e384c20', '1', 'Mcdonald''s', 'Aujourd''hui, McDonalds est le plus important groupe de restauration rapide, devant Restaurant Brands International (Burger King) ou Yum! Brands (KFC, Pizza Hut).', '{"matricepoints":[[47.748619131384125,6.802443363703788],[47.748626796157254,6.802496337331832],[47.74859568618874,6.80252114776522],[47.74857900402407,6.802448057569564],[47.748619131384125,6.802443363703788]]}', 3, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('43a48d2f-47e2-4a3c-ac18-9f7f99af6986', '4', 'Stand de tir à la carabine', 'Les participants utilisent une carabine pour viser des cibles et gagner des prix en fonction de leur précision de tir.', '{"matricepoints":[[47.74859478445025,6.801972636021675],[47.748613720955355,6.802021586336196],[47.74862048399123,6.802070536650718],[47.74861417182445,6.802104734815658],[47.74860154748859,6.802116134203971],[47.748571339243895,6.802126863040031],[47.74854068011196,6.802121498622001],[47.74852489966938,6.8020504200831065],[47.74852580140907,6.801984705962242],[47.74855420620181,6.801945143379271],[47.7485803566322,6.801937767304481],[47.74859478445025,6.801972636021675]]}', 2, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('0bf3a1d3-d6ab-4c7a-acf2-5aec73036ebc', '2', 'Stand de trampoline ', 'Les enfants peuvent sauter et faire des acrobaties sur des trampolines.', '{"matricepoints":[[47.748411202848025,6.801368091255428],[47.748402185430436,6.8014887906610975],[47.74833004603325,6.801483426243068],[47.74833184951941,6.801317129284144],[47.748411202848025,6.801368091255428]]}', 5, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('17d073b0-4bc2-4af7-a9ff-bf03e2b2f191', '2', 'Montagnes russes ', 'Des parcours de montagnes russes, souvent plus petits que ceux des parcs d''attractions, mais offrant des sensations fortes.', '{"matricepoints":[[47.748405792397655,6.801775787025691],[47.74837874013732,6.80168190971017],[47.748319225115054,6.80169800296426],[47.748353491348304,6.801864299923182],[47.748405792397655,6.801775787025691]]}', 4, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('55e61237-e95a-4e71-9f4f-1ffdb980fd59', '1', 'McDonald''s', 'Aujourd''hui, McDonalds est le plus important groupe de restauration rapide, devant Restaurant Brands International (Burger King) ou Yum! Brands (KFC, Pizza Hut).', '{"matricepoints":[[47.74860695791861,6.802218728698791],[47.74859072662683,6.802275055088104],[47.74855240272337,6.802270361222328],[47.74855961663676,6.802199953235687],[47.7485916283654,6.802192577160896],[47.74860695791861,6.802218728698791]]}', 3, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('d0aaf810-3895-4114-b2b7-46bd6c022d51', '4', 'Stand de pêche à la ligne', 'Les enfants pêchent des jouets ou des prix accrochés à des hameçons.', '{"matricepoints":[[47.74851317705179,6.801763423718513],[47.74849108441914,6.80174665991217],[47.7484721478694,6.801808350719512],[47.74848341962601,6.801870041526855],[47.74851858749102,6.801859312690795],[47.74852489966938,6.801801645196975],[47.74851317705179,6.801763423718513]]}', 2, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('12945743-3f48-441e-9f14-c7e1ad8c6e7a', '2', 'Le Palais des glaces', 'Un labyrinthe de miroirs déformants qui défient la perception visuelle des visiteurs.', '{"matricepoints":[[47.748009024503425,6.801518294960261],[47.747877369033816,6.80142978206277],[47.74781604993427,6.801451239734889],[47.74781424643026,6.801577303558589],[47.747844905990114,6.80166581645608],[47.74789360054805,6.801673863083126],[47.747899011051686,6.8016336299479025],[47.74792426006115,6.8016094900667685],[47.747933277561586,6.8016094900667685],[47.74796574055015,6.801579985767604],[47.74799459652299,6.801577303558589],[47.74802705947331,6.801542434841396],[47.748009024503425,6.801518294960261]]}', 5, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('126768dd-e010-4950-9b36-3ce1356e04c0', '2', 'La grande roue', 'Un grand manège circulaire qui offre une vue panoramique de la fête foraine et de ses environs.', '{"matricepoints":[[47.74818396344777,6.801319811493159],[47.748086574829635,6.801209840923549],[47.74799640002075,6.801228616386653],[47.74800722100607,6.8013385869562635],[47.74803607695591,6.801408324390651],[47.748077557355785,6.80141905322671],[47.74813346566852,6.801405642181636],[47.74818576693896,6.801370773464443],[47.74818396344777,6.801319811493159]]}', 5, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('1058b5a3-a01f-4f3d-8682-16a166173d20', '4', 'Stade de foot', 'Les participants peuvent tenter de marquer des buts contre un gardien de but.Une version géante du baby-foot où les joueurs sont attachés à des barres et doivent jouer en équipe.', '{"matricepoints":[[47.74790622505564,6.802516076713801],[47.74778719386245,6.802398059517147],[47.747752927256364,6.802440974861385],[47.74776014128057,6.80255362764001],[47.747785390357414,6.802709195762874],[47.74783047796419,6.80280575528741],[47.7478827795391,6.802773568779231],[47.74790802855647,6.802698466926815],[47.747935081061485,6.802596542984248],[47.74790622505564,6.802516076713801]]}', 2, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('5b31bca9-6ef5-46ee-8677-5c9d1ad21577', '1', 'Le Tagada', 'Un manège où les passagers sont secoués et propulsés dans toutes les directions sur une plateforme en rotation', '{"matricepoints":[[47.74815510757991,6.802306864410641],[47.74813346566852,6.802215669304133],[47.748104609772675,6.802180800586941],[47.748086574829635,6.80220225825906],[47.74807214687073,6.802223715931179],[47.74804509443697,6.802288088947536],[47.74806673638509,6.802333686500789],[47.748104609772675,6.802352461963894],[47.74813346566852,6.802352461963894],[47.74815510757991,6.802306864410641]]}', 5, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('d1933272-d162-4b0e-b32d-e01353262c30', '6', 'toilettes', e'Des toilettes adaptées aux personnes à mobilité réduite, avec des rampes d\'accès et des cabines plus spacieuses.	', '{"matricepoints":[[47.74832824254705,6.802677009254696],[47.74829397629719,6.802642140537501],[47.748290369322206,6.802706513553859],[47.74831742162849,6.802703831344845],[47.74832824254705,6.802677009254696]]}', 2, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('46b873f8-9395-4099-be2d-d0493261b4f8', '6', 'toilettes', e'Des toilettes adaptées aux personnes à mobilité réduite, avec des rampes d\'accès et des cabines plus spacieuses.	', '{"matricepoints":[[47.74810641326664,6.801571939140559],[47.74807395036579,6.8015612103045],[47.74807395036579,6.801571939140559],[47.74807395036579,6.801593396812678],[47.74808837832423,6.801593396812678],[47.74810641326664,6.801571939140559]]}', 2, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('1173983f-be9a-4948-8f47-4e2a04991c19', '6', 'toilettes ', 'Des toilettes adaptées aux personnes à mobilité réduite, avec des rampes d''accès et des cabines plus spacieuses.', '{"matricepoints":[[47.748082967840276,6.801834795624019],[47.74806673638509,6.80179724469781],[47.748064932889754,6.801834795624019],[47.748082967840276,6.801856253296138],[47.748082967840276,6.801834795624019]]}', 2, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('ae0d3a34-2f18-48c6-b59d-f385c5e84a4a', '2', 'Le Crazy Jump', 'Une tour qui monte et descend rapidement, offrant des sensations de chute libre.', '{"matricepoints":[[47.7485338395725,6.802534852176906],[47.748440058573905,6.802572403103115],[47.74841661329784,6.802470479160548],[47.74848514561355,6.802355144172909],[47.7485554813174,6.802384648472072],[47.7485338395725,6.802534852176906]]}', 5, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('21490de3-206f-487e-80d2-8f828a3874a1', '2', 'Le Breakdance', 'Un manège où les passagers sont assis dans des sièges qui pivotent et tournoient à grande vitesse.', '{"matricepoints":[[47.747933277561586,6.802306864410641],[47.74785933401202,6.802068147808315],[47.74779981839586,6.802065465599299],[47.74775112375016,6.802231762558223],[47.74781244292616,6.802363190799952],[47.747899011051686,6.802384648472072],[47.747933277561586,6.802306864410641]]}', 2, false, true);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('f785eeed-6001-4bb1-b540-8cd0a88aef06', '2', 'Terrain ', 'Un grand terrain pour mettre un manège', '{"matricepoints":[[47.7480198454861,6.801724825054408],[47.74792606356137,6.801724825054408],[47.74792065306055,6.802092287689449],[47.74800541750867,6.802014503628016],[47.748028862969946,6.801880393177272],[47.7480198454861,6.801724825054408]]}', null, true, false);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('f5669d3c-88c0-4067-b280-10ab1fee41c8', '1', 'Restaurant', 'Un grand terrain pour un restaurant', '{"matricepoints":[[47.74830479722063,6.80219689384103],[47.74823806815686,6.802089605480434],[47.74819117741224,6.802175436168911],[47.74820019486639,6.802271995693446],[47.74831561814183,6.802266631275417],[47.74830479722063,6.80219689384103]]}', null, true, false);
INSERT INTO public.emplacement (id_emplacement, id_type, nom, description, matricepoints, prestataire_id, use_resa, accepted) VALUES ('58d3b063-b332-42e7-8eac-b54276954dff','4','Draky Draky Scene','Drake, de son vrai nom Aubrey Drake Graham, est un artiste canadien né le 24 octobre 1986 à Toronto. Il est surtout connu comme rappeur, chanteur, auteur-compositeur et producteur de musique. Drake a acquis une renommée mondiale grâce à ses hits à succès tels que "Hotline Bling" et "God''s Plan". Il est également reconnu pour son influence dans la mode et la culture populaire.','{"matricepoints":[[47.748227247219546,6.801740918308498],[47.74830119024639,6.80193403735757],[47.74818576693896,6.801968906074763],[47.74811182374813,6.801810655742885],[47.748227247219546,6.801740918308498]]}',1,false,true);

SELECT * from lignecommandebillet;
SELECT * from lignecommandearticle;

SELECT SUM(ventes) as vente_total from (
SELECT SUM(prixTotalBillet) as ventes
from (SELECT b.price * count(lcb.uuid) as prixTotalBillet
     FROM ligneCommandeBillet lcb
              JOIN billet b ON lcb.id_billet = b.id
     group by b.id, b.title, b.price) as lbpTB
UNION
SELECT SUM(prixTotalArticle) as ventes
from (SELECT p.prix * sum(lca.quantite) as prixTotalArticle
     FROM ligneCommandeArticle lca
              JOIN produit p ON lca.id_produit = p.id_produit
     group by p.id_produit) as lbpTA
) as lTvlTv;

