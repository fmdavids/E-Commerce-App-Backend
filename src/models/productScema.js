const mongoose = require("mongoose")
const {Schema} = mongoose;

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    quantity:{
        type: Number,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    size:{
        type: Number,
        trim: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
      },
      productAvatars: {
        type: String
      },
},
{
    timestamps: true
}
);  

const Product = mongoose.model("Product", productSchema)
module.exports = Product;