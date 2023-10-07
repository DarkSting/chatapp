const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  testfunc,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/").get(protect, allUsers);
router.post("/login", authUser);
router.post('/send',testfunc)

module.exports = router;
