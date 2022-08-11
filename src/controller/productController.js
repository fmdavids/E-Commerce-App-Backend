const Product = require("../models/productScema");

const cloudinary = require('../utils/cloudinary')
const fs = require('fs')

const createProudct = async (req, res) => {
  try {
      const {id} = req.user
    const { name, price, quantity, description, size } =
      req.body;
    const newProduct = await Product.create({
        name, price, quantity, description, size, userId: id
    });
    const saveProduct = await newProduct.save();

    res.status(200).json({
      success: true,
      msg: "Product created succesfully",
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        msg: "Encounter error! Product could not be created",
        data: error,
      });
  }
};

const getAllProducts = async (req, res) => {
    try {
    // const allProducts = await Product.find({}).populate({path: 'userId', select: ['firstName', 'lastName', 'storeName']})

        const allProducts = await Product.find({});

        res.status(200).json({
            success: true,
            msg: "Details of all Products",
            data: allProducts,
          });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Encounter error! Products could not be found",
            data: error,
          });
    }
}


const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({_id:id});
        res.status(200).json({
            success:true,
            msg: `found ${id}`,
            data: product
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Encounter error! Product could not be found",
            data: error,
          });
    }
}
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const payLoad = req.body;
        const updadateStore = await Product.findByIdAndUpdate({_id:id}, payLoad, {new:true})
        res.status(200).json({
            success:true,
            msg: `found ${id} and updated`,
            data: updadateStore
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Product not updated",
            data: error
          });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const removeProduct = await Product.findByIdAndDelete({_id:id});
        res.status(200).json({
            success:true,
            msg: `found ${id} and deleted`,
            data: removeProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Product not deleted",
            data: error
          });
    }
}
const uploadAvatar = async (req, res) => {

    const {id} = req.user
    
    const uploader = async (path) => await cloudinary.uploads(path , 'avatars')
    let url;
 
    const file = req.file
 
    const {path} = file
    const newPath = await uploader(path)
 
    url = newPath.url
 
    fs.unlinkSync(path)
              
 
    let user = await Product.findOne({_id: id})
 
    user.avatars = url.toString()
 
    await user.save()
 
    res.status(200).json({
     success: true,
     msg: "successfully uploaded an image for the user",
     data: user
 })
 
 }
module.exports = {createProudct, getAllProducts, getProduct, updateProduct, uploadAvatar, deleteProduct};
