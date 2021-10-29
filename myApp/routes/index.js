const express = require('express');
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.status(200).send("You have everything installed !");
});

router.get('/register', function(req, res) {
  res.status(200).send("kizoo");
});

module.exports = router;
