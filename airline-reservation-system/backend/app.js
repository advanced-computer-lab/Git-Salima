// External variables
const express = require("express");
const mongoose = require('mongoose');
const router = require('./routes/flights');
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

<<<<<<< HEAD

=======
app.use(router);
>>>>>>> 8318446face7c1ab52addae9baee98a1d1bc35fd

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});