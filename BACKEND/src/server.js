const express = require('express');
const dotenv = require('dotenv');
const prestaRoutes = require('./router/prestataires.router');
const adminRoutes = require('./router/admin.router');
const loginRoutes = require('./router/login.router');
const mapPrestatairesRoutes = require('./router/mapPrestataires.router')
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
const port = process.env.PORT || 3000; // process.env.PORT est undefined jcp pk
const app = express();

app.use(express.json());//decode les requete qui contiennent du json


app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:8080', // Remplacez par votre URL front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Autorise l'envoi de cookies et d'en-têtes d'authentification
    
}));

app.use("/prestataires", prestaRoutes);
app.use("/admin", adminRoutes);
app.use("/mapPrestataires", mapPrestatairesRoutes);
app.use("/login", loginRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
