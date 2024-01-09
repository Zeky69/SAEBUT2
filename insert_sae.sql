INSERT INTO type VALUES('1', 'Restaurant' ,'restaurant.png'),
                       ('2', 'Attraction','coaster.png'),
                      ('3', 'Scene','stadium.png'),
                       ('4', 'Stand' , 'tent.png'),
                      ('5', 'Boutique' ,'tent.png'),
                      ('6', 'Toilettes','toilets.png');

INSERT INTO ETAT (Etat_libelle) VALUES ('en attente'), ('accepté'), ('refusé');





INSERT INTO toilette VALUES ( 'c8511a54-441b-43b1-b888-5d261f853924',
                             'descriptiion toillette 1: 2 toilette Femme, 1 toilette Personne mobilité réduite', 'toilette 1', 'bat_6_wc',-126.34925842285156, 6.462428092956543, 49.19313430786133, 0 ),
                            ('f281672c-c7c8-4ad2-808f-dfd67138c701', 'description toilette 2', 'toilette 2', 'bat_6_wc1', -116.06807708740234, 6.462428092956543, -32.968910217285156, 0),
                            ('e4abaf9f-e1bf-4f76-8cd8-0cfbee71e486','description toilette 3', 'toilette 3', 'bat_6_wc2', 27.999588012695312, 6.462428092956543 , -32.968910217285156, 0),
                            ('fa35a778-6f57-44f2-8915-cea39caa1f33', 'description toilette 4', 'toilette 4', 'bat_6_wc3', 114.55597686767578, 6.462428092956543, 40.598480224609375, 0);


INSERT INTO scene VALUES ('9fcbe75a-2918-4fbd-a558-dc994100f656', 'description scene', 'stadium 1', 'bat_3_confer', -119.60863494873047, 11.881292343139648, 101.35678100585938, 1.570796461153735);


INSERT INTO event VALUES ('1', 'premier concert', 'description event 1','9fcbe75a-2918-4fbd-a558-dc994100f656', 'red', 'acepted', '2024-06-01T12:30:00', '2024-06-01T14:30:00',2),
                         ('2',  'Premiere lan', 'description event 2', '9fcbe75a-2918-4fbd-a558-dc994100f656', 'blue', 'acepted', '2024-06-01T22:00:00', '2024-06-02T12:00:00',2),
                         ('3', 'deuxieme concert', 'description event 3',  '9fcbe75a-2918-4fbd-a558-dc994100f656', 'green', 'acepted', '2024-06-03T14:00:00', '2024-06-03T16:00:00',2);

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

INSERT INTO prestataire ( description, nom, id_user, etat_id,page_info) VALUES
('Prestataire Description', 'Prestataire Name', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'John' AND LAST_NAME = 'Doe'), 2,'<p>Ca marche de zinzin</p>'),
('Prestataire Description', 'Prestataire Name', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Jane' AND LAST_NAME = 'Smith'), 2,NULL),
('Prestataire Description', 'Prestataire Name', (SELECT User_Id FROM UTILISATEURS WHERE FIRST_NAME = 'Bob' AND LAST_NAME = 'Johnson'), 2,NULL);


