const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (name) var gameID = req.query.id;
  var name = req.query.name;
  res.render("index.ejs", { gameID: gameID, name: name });
});

// router.get("/:match", (req, res) => {});

module.exports = router;
