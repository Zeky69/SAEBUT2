const express = require('express');
const dotenv = require('dotenv');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fileUpload = require('express-fileupload');
const prestaRoutes = require('./router/prestataires.router');
const adminRoutes = require('./router/admin.router');
const userRoutes = require('./router/utilisateur.router');
const sceneRoutes = require('./router/scnene.router');
const map2DRoutes = require('./router/map2D.router');
const bodyParser = require('body-parser');
const resaRoutes = require('./router/reservation.router')
const batRoutes = require('./router/batiment.router')
const imageRoutes = require('./router/image.router')
const commentaireRoutes = require('./router/commentaire.router')
const shopRoutes = require('./router/shop.router')
const statistiquesRoutes = require('./router/statistiques.router')
const commandesRoutes = require('./router/commandes.router')

const cors = require('cors');
const path = require("path");

dotenv.config();
const port = process.env.PORT || 3000; // process.env.PORT est undefined jcp pk
const app = express();

app.use(express.json());//decode les requete qui contiennent du json


app.use(bodyParser.json());
app.use(fileUpload());

// app.use(cors({
//     origin: 'http://localhost:8080', // Remplacez par votre URL front-end
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Autorise l'envoi de cookies et d'en-têtes d'authentification
//
// }));

app.use(cors());

/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "Belforaine API",
            description: "API documentation",
            contact: {
                name: "Belforaine",
            },
            //servers: ["http://localhost:3000/"],
            servers: ['https://api.codeky.fr'],
        },
    }),
    apis: ["server.js", "./router/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

app.use("/prestataires", prestaRoutes);
app.use("/map2D", map2DRoutes);
app.use("/admin", adminRoutes);
app.use("/scene", sceneRoutes);
app.use("/user", userRoutes);
app.use("/reservation", resaRoutes);
app.use("/batiment", batRoutes);

app.use('/image', imageRoutes);
app.use('/shop',shopRoutes);
app.use('/commentaire',commentaireRoutes);
app.use('/statistiques', statistiquesRoutes);
app.use('/commandes', commandesRoutes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
