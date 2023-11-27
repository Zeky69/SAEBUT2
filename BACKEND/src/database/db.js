const {Pool} = require("pg");
require("dotenv").config();

const creditentials = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port:process.env.DB_PORT
}

const pool = new Pool(creditentials)

pool.on('error',(err,client) =>{
    console.error('Unexpected error on idle client',err)
    process.exit(-1)
})
module.exports = pool;