const express = require("express")
const router = express.Router();
const upload = require("../utils/upload")


const verifyUser = require("../middlewares/verifyMerchant")
const {createProudct, getAllProducts, getProduct, updateProduct, deleteProduct, uploadAvatar} = require("../controller/productController");

router.post('/:id/upload', verifyUser, upload.single('productAvatars'), uploadAvatar) 

router.post(`/addProduct`, verifyUser, createProudct)
router.get(`/viewProducts`, getAllProducts)
router.route(`/:id`).get(getProduct).put(verifyUser, updateProduct).delete(verifyUser, deleteProduct);

module.exports = router;