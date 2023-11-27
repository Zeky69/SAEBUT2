INSERT INTO type VALUES('1', 'Stand'),
                      ('2', 'Scene'),
                      ('3', 'Attraction'),
                      ('4', 'Parking'),
                      ('5', 'Toilettes');


INSERT INTO UTILISATEURS VALUES('1', 'fnAdmin', 'lnAdmin', 'admin@admin.com',now()),
                              ('2', 'fnUser', 'lnUser', 'test@test.com',now()),
                              ('3','fnUser2', 'lnUser2', 'test2@test2.com' ,now());

INSERT INTO droits VALUES('1', 'admin'),
                         ('2', 'prestataire'),
                         ('3', 'user');


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