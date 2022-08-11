const express = require("express");
const router = express.Router();

const {merchantSignUp, merchantSignIn, customerSignUp, customerSignIn} = require("../controller/authController")

router.post(`/merchantsignup`, merchantSignUp);
router.post(`/merchantsignin`, merchantSignIn);
router.post(`/customersignup`, customerSignUp);
router.post(`/customersignin`, customerSignIn);

module.exports = router;