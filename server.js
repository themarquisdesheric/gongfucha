'use strict';

const pg = require('pg');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
console.log(process.env);
//loads rest of CSS assets in public
app.use(express.static('./public'));

//set index.html to root
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: '.' });
});

//app.listen to log a console message telling us what PORT is up.
app.listen(PORT, function () {
  console.log(`Server set to ${PORT}`);
});