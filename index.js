// Loads .env file content into process.env by default
require("dotenv").config();

const express = require('express');
const cors = require('cors');
require("./DB/connection");
const routes=require('./Routes/router')


// create express application
const dc_Server = express()

dc_Server.use(cors());
// convert json to js
dc_Server.use(express.json());
dc_Server.use(routes);

const PORT = 3000 || process.env.PORT;

dc_Server.listen(PORT, () => {
  console.log(
    `daily Cart Server Started At Port : ${PORT} and waiting for client requests !!!`
  );
});

// http get request resolving to http://localhost:4000/
dc_Server.get("/", (req, res) => {
  res.send(
    `<h1>Daily Cart Server Started At Port : ${PORT} and waiting for client requests !!!</h1>`
  );
});
