const express = require('express');
// const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const db = require('./model');
var pdf = require('./routes/pdf.route');
const app = express();


const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use('/api/v1', pdf);

db.sequelize.sync({alter: true});

app.use(
    '/api-reader',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.listen(PORT, console.log('****** Server Ready To Process Requests ******'));

  