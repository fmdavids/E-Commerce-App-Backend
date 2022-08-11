const mongoose = require("mongoose")
const {Schema} = mongoose;

const merchantSchema = new Schema({
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
    storeName:{
        type:String,
        required: true,
        unique: true,
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
        type: String,
      },
      avatar: {
        type: String
      },
},
{
    timestamps: true
}
);

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;