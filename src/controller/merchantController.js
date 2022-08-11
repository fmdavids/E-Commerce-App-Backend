const Merchant = require("../models/mercharntSchema");


const cloudinary = require('../utils/cloudinary')
const fs = require('fs')


const getAllMerchants = async (req, res) => {
    try {
        const allMerchants = await Merchant.find({});

        res.status(200).json({
            success: true,
            msg: "Details of all Merchant",
            data: allMerchants,
          });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Encounter error! Merchant could not be found",
            data: error,
          });
    }
}


const getMerchant = async (req, res) => {
    try {
        const id = req.params.id;
        const store = await Merchant.findOne({_id:id});
        res.status(200).json({
            success:true,
            msg: `found ${id}`,
            data: store
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Encounter error! Merchant could not be found",
            data: error,
          });
    }
}
const changeStoreName = async (req, res) => {
    try {
        const id = req.params.id;
        const payLoad = req.body;
        const updadateStore = await Merchant.findByIdAndUpdate({_id:id}, payLoad, {new: true})
        res.status(200).json({
            success:true,
            msg: `found ${id} and updated`,
            data: updadateStore
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Merchant not updated",
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
              
 
    let user = await Merchant.findOne({_id: id})
 
    user.avatar = url.toString()
 
    await user.save()
 
    res.status(200).json({
     success: true,
     msg: "successfully uploaded an image for the user",
     data: user
 })
 
 }


const deleteStore = async (req, res) => {
    try {
        const id = req.params.id;
        const store = await Merchant.findByIdAndDelete({_id:id});
        res.status(200).json({
            success:true,
            msg: `found ${id} and deleted it`,
            data: store
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Merchant not deleted",
            data: error
          });
    }
}

module.exports = {getAllMerchants, getMerchant, changeStoreName, deleteStore, uploadAvatar}; //createMerchant,
