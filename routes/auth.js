const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, logIn, renewToken } = require("../controllers/auth");
const { fieldValidation } = require("../middlewares/fieldValidation");
const { validateJWT } = require("../middlewares/validateJWT");
const router = Router();

router.post(
  "/new",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("email", "The email is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be at least 6 characters").isLength({
      min: 6,
    }),
    fieldValidation,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "The email is required").isEmail(),
    check("email", "The email is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    check("password", "The password must be at least 6 characters").isLength({
      min: 6,
    }),
    fieldValidation,
  ],
  logIn
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
