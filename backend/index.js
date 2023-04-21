const express = require("express");
const bodyParser = require('body-parser')
const user = require("./routes/user");
const gamestate = require("./routes/gamestate");
const InitiateMongoServer = require("./config/db");

const cors = require('cors');

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4001;

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

// /**
//  * Router Middleware
//  * Router - /user/*
//  * Method - *
//  */
app.use("/user", user);
app.use("/gamestate", gamestate);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});