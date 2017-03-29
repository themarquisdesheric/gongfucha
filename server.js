'use strict';

const pg = require('pg');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
//loads rest of CSS assets in public
app.use(express.static('./public'));
console.log(process.env);

//Connect to postgres or heroku DB
const conString = process.env.HEROKU_POSTGRESQL_BRONZE_URL || 'postgres://localhost:5432';

// Pass conString to pg, which creates new client object
const client = new pg.Client(conString);

// Connect client object to DB
client.connect();

//set index.html to root
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: '.' });
});

// Routes for making API calls to use CRUD operations on DB
app.get('/tea', function (request, response) {
  client.query('SELECT * FROM tea_locations')
    .then(function (results) {
      response.send(results.rows);
    })
    .catch(function (err) {
      console.log(err);
    })
});

// Insert into tables
app.post('/tea', function(request, response) {
  client.query(
    `INSERT INTO
    tea_locations(shopName, "shopUrl", description, street, city, state, zip, country, category)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
    [
      request.body.shopName,
      request.body.shopUrl,
      request.body.description,
      request.body.street,
      request.body.city,
      request.body.state,
      request.body.zip,
      request.body.country,
      request.body.category
    ]
  )
  .then(function() {
    response.send('insert complete');
  })
  .catch(function(err){
    console.log(err);
  })
});

loadDB();

//app.listen to log a console message telling us what PORT is up.
app.listen(PORT, function () {
  console.log(`Server set to ${PORT}`);
});

//////// ** DATABASE LOADER ** ////////
//These functions initilize our database and populate it from the JSON file "data". We do need 'fs' for this.
function loadTeaLocations() {
  client.query('SELECT COUNT(*) FROM tea_locations')
    .then(results => {
      if (!parseInt(results.rows[0].count)) {
        fs.readFile('./public/data/data.json', (err, fd) => {
          if (err) return console.error(err);
          JSON.parse(fd.toString()).forEach(ele => {
            client.query(`
            INSERT INTO
            tea_locations(shopName, "shopUrl", description, street, city, state, zip, country, category)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
            [ele.shopName, ele.shopUrl, ele.description, ele.street, ele.city, ele.state, ele.zip, ele.country, ele.category]
            )
          })
        })
      }
    })
}

function loadDB() {
  client.query(`
  CREATE TABLE IF NOT EXISTS tea_locations (
    tealocation_id SERIAL PRIMARY KEY,
    shopName VARCHAR(255) NOT NULL,
    "shopUrl" VARCHAR (255),
    description TEXT NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    category VARCHAR(20));`
  )
  .then(function() {
    loadTeaLocations();
  })
  .catch(function(err) {
    console.log(err);
  })
}