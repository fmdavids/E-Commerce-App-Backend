const express = require("express");
const router = express.Router();

const verifyUser = require("../middlewares/verifyMerchant")
const {getAllCustomers, getCustomer, updateCustomer, deleteCustomer} = require("../controller/customerController")
// const {customerSignUp} = require("../controller/authController")

// router.post(`/createcustomer`, customerSignUp);
router.get(`/customerlist`, verifyUser, getAllCustomers);
router.route(`/merchant/:id`).get(verifyUser, getCustomer).put(verifyUser, updateCustomer).delete(verifyUser, deleteCustomer);

module.exports = router;