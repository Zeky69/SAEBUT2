INSERT INTO type VALUES('1', 'Stand'),
                      ('2', 'Scene'),
                      ('3', 'Attraction'),
                      ('4', 'Parking'),
                      ('5', 'Toilettes');

INSERT INTO groupes VALUES  (1, 'groupe admin'),
                            (2, 'groupe prestataire'),
                            (3, 'groupe user');

INSERT INTO UTILISATEURS VALUES('1', 'fnAdmin', 'lnAdmin', 'admin@admin.com',now(),1),
                              ('2', 'fnUser', 'lnUser', 'test@test.com',now(),3),
                              ('3','fnPresta', 'lnPresta', 'test2@test2.com' ,now(),2);

INSERT INTO mots_de_passe_utilisateurs VALUES(1, '1','mdpAdmin'),
                                             (2, '2','mdpUser'),
                                             (3, '3','mdpUser2');

INSERT INTO prestataire VALUES ('1', 'prestataire qui prestate','prestatata','3','3');


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

INSERT INTO droits_de_groupes VALUES(1, 1, '1'),
                                    (2,1,'3'),
                                    (3, 2, '1'),
                                    (4,2,'2'),
                                    (5, 3, '1'),
                                    (6,3,'4');

INSERT INTO menus VALUES (1, 'Accueil', 1),
                         (2, 'Attractions', 2),
                         (3, 'Restauration', 3),
                         (4, 'Boutique', 4),
                         (5, 'Billetterie', 5),
                         (6, 'Organisateurs', 6),
                         (7, 'Mon espace', 7),
                         (8, 'Gérer', 8);

INSERT INTO droits_de_menus VALUES (1, 3, 1),
                                   (2, 3, 2),
                                   (3, 3, 3),
                                   (4, 3, 4),
                                   (5, 3, 5),
                                   (6, 3, 6),
                                   (7, 2, 7),
                                   (8, 2, 1),
                                   (9, 1, 8),
                                   (10, 1, 1);

SELECT * FROM menus
    right join droits_de_menus ON menus.id = droits_de_menus.menu_id
    right join utilisateurs ON droits_de_menus.group_id = utilisateurs.group_id
;




