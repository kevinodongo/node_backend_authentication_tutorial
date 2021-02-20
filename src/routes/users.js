const express = require("express")
const router = express.Router()
const user = require("../controller/user.controller");
//const { authJwt } = require("../middleware/auth");

// create a new user
router.post("/", user.createuser  );

// retrieve a user
router.get("/:id", user.retriveuser);

// update a user
router.put("/:id", user.updateuser);

module.exports = router;