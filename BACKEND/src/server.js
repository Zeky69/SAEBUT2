const express = require('express');
const dotenv = require('dotenv');
const prestaRoutes = require('./router/prestataires.router');
const adminRoutes = require('./router/admin.router');
const loginRoutes = require('./router/login.router');
dotenv.config();
const port = process.env.PORT || 3000; // process.env.PORT est undefined jcp pk
const app = express();

app.use(express.json()); //decode les requete qui contiennent du json
app.use("/prestataires", prestaRoutes);
app.use("/admin", adminRoutes);

app.use("/login", loginRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
