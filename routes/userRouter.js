const express = require("express");
const router = express.Router();
const authController = require("../contollers/authController");
const userController = require("../contollers/userController");
const { route } = require("./userRouter");

router.post("/login", authController.loginUser);
router.post("/signup", authController.signup);

router.get("/", userController.getAllUsers);

router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  userController.createOne
);
router.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin", "editor"),
  userController.deleteOne
);
router.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("admin", "editor"),
  userController.UpdateOne
);

module.exports = router;
