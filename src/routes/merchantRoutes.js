const express = require("express");
const router = express.Router();
const upload = require("../utils/upload")

const verifyUser = require("../middlewares/verifyMerchant")
const {getAllMerchants, getMerchant, changeStoreName, deleteStore, uploadAvatar} = require("../controller/merchantController")

// router.post('/upload', verifyUser, upload.single('avatar'), uploadAvatar)
router.post('/upload', verifyUser, upload.single('avatar'), uploadAvatar)

router.get(`/merchantsList`, verifyUser, getAllMerchants);
router.route(`/onemerchant/:id`).get(verifyUser, getMerchant).put(verifyUser, changeStoreName).delete(verifyUser, deleteStore);


module.exports = router;