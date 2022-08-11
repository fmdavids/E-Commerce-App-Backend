const {merchantValidation, custormerValidation, } = require("../validation/validationSchema")
const Merchant = require("../models/mercharntSchema")
const Customer = require("../models/customerSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const merchantSignUp = async (req, res) => {
    try {
      let { firstName, lastName, storeName, email, phoneNumber, password } =
        req.body;
       let merchant = await merchantValidation.validateAsync(req.body)
       merchant = await Merchant.findOne({ email: req.body.email });
      if (merchant) 
        return res
          .status(400)
          .json({ success: false, msg:  `${req.body.email} already exist` });

      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      password = hashedPassword;
      const newMerchant = await Merchant.create({ firstName, lastName, storeName, email, phoneNumber, password });
      await newMerchant.save()
      
      const response = {
        firstName : newMerchant.firstName,
        lastName : newMerchant.lastName,
        email: newMerchant.email,
        storeName: newMerchant.storeName
      }

      res.status(200).json({ success: true, msg: "Merchant successfully created", data: response });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: " encounter error",
        // msg: error.details[0].message
        data: error,
      });
      // console.log(error)
    }
  };
  
  const customerSignUp = async (req, res) => {
    try {
      let { firstName, lastName,  email, phoneNumber, password } =
        req.body;
      let customer = await custormerValidation.validateAsync(req.body)
      customer = await Customer.findOne({ email: req.body.email });
      if (customer)
        return res
          .status(400)
          .json({ success: false, msg: `${req.body.email} already exist` });
  
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      password = hashedPassword;
      const newCustomer = await Customer.create({ firstName, lastName, email, phoneNumber, password });
      await newCustomer.save();

      const response = {
        firstName : newCustomer.firstName,
        lastName : newCustomer.lastName,
        email: newCustomer.email
      }

      res.status(200).json({ success: true, msg: "Customer successfully created", data: response });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "encounter error, Customer not created",
        data: error,
      });
    }
  };

  const merchantSignIn = async (req, res) => {
    const {  email, password } = req.body;

    try {
      let merchant = await Merchant.findOne({ email: email });
      if (!merchant)
        return res
          .status(404)
          .json({ success: false, msg: "No user with this email" });
      const isValidPassword = await bcrypt.compare(password, merchant.password);
      if (!isValidPassword)
        return res
          .status(404)
          .json({ success: false, msg: "email or password not correct" });
  
      const accessToken = jwt.sign({id:merchant._id, firstName : merchant.firstName, storeName: merchant.storeName, email:email}, process.env.JWT_SECRET, {expiresIn: '1d'})
      const refreshToken = jwt.sign({id: merchant._id, firstName: merchant.firstName, storeName: merchant.storeName, email:email}, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'})
      merchant.refreshToken = refreshToken 
      await merchant.save()
      res
        .status(200)
        .json({ success: true, msg: "Merchant successfully signed in", accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "encounter error",
        data: error,
      });
    }
  };

  const customerSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
      let customer = await User.findOne({ email: email });
      if (!customer)
        return res
          .status(404)
          .json({ success: false, msg: "No user with this email" });
      const isValidPassword = await bcrypt.compare(password, customer.password);
      if (!isValidPassword)
        return res
          .status(404)
          .json({ success: false, msg: "email or password not correct" });
  
          const accessToken = jwt.sign({id:customer._id, firstName : customer.firstName, email:email}, process.env.JWT_SECRET, {expiresIn: '1d'})
          const refreshToken = jwt.sign({id: customer._id, firstName: customer.firstName, email:email}, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'})
          customer.refreshToken = refreshToken 
          await customer.save()
  
      res
        .status(200)
        .json({ success: true, msg: "User successfully signed in", token });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "encounter error",
        data: error,
      });
    }
  };
  

module.exports = {merchantSignUp, merchantSignIn, customerSignUp, customerSignIn};