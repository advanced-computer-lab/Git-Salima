// External variables
const express = require("express");
const mongoose = require('mongoose');
const router = require('./routes/flights');
const cors = require('cors');
require('dotenv').config();
const cors = require('cors');
//App variables
var bodyParser = require('body-parser');

const app = express();
app.use(cors());
const port = process.env.PORT || "8000";
app.use(express.json());
// CONNECTING WITH THE DB!!

const MongoURI = process.env.MONGO_URI;
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("MongoDB is now connected"))
    .catch(err => console.log(err));

app.use(router);
app.use(cors);
app.use(express.urlencoded({ extended: true }));

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});