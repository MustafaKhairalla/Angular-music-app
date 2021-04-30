const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const db = require("./config/keys").mongoURI;

const app = express();
const PORT = process.env.PORT || 3001

// app middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI
mongoose.connect(db)
    .then(() => console.log("MongoDB is connected....."))
    .catch(err => console.log(err))

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
