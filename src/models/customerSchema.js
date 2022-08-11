const mongoose = require("mongoose")
const {Schema} = mongoose;

const customerSchema = new Schema({
    firstName:{
        type:String,
        required: true,
        trim: true
    },
    lastName:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String
      },
},
{
    timestamps: true
}
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;