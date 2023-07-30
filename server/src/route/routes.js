const express = require("express");
const router = express.Router();

const {
  register,
  login,
  setAvatar,
  getAllUsers,
  logout,
} = require("../controller/UserController");
const { addMessage, getMessage } = require("../controller/MessageController");

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getallusers/:id", getAllUsers);
router.get("/logout/:id", logout);

router.post("/addmessage", addMessage);
router.post("/getmessage", getMessage);

module.exports = router;
