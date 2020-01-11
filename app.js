const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("config");
const socketIO = require("socket.io-client")(config.appUrl);
const app = express();
const sectionRoutes = require("./routes/section");
const boardRoutes = require("./routes/board");
const usersRoutes = require("./routes/users");
const resultRoutes = require("./routes/result");
const {
  DBConstants
} = require("./constants");

let url = '';
if (config.isAtlas) {

  url = `mongodb+srv://${config.DB.username}:${config.DB.password}@${config.DB.host}/${config.DB.database}?retryWrites=true&w=majority`;

} else {

  url = `mongodb://${config.DB.host}:${config.DB.port}/${config.DB.database}`;

}
console.log(url);

mongoose
  .connect(url)
  .then(() => {
    console.log(DBConstants.MESSAGES.CONNECTED_TO_DATABASE);
  })
  .catch((error) => {
    console.log(error);
    console.log(DBConstants.MESSAGES.DB_CONNECTION_FAILED);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.use("/api", usersRoutes);

app.use("/api", sectionRoutes);

app.use("/api", boardRoutes);

app.use("/api", resultRoutes);

module.exports = app;
