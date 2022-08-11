const express = require("express");
const dotenv = require("dotenv");
const dataBaseConnect = require("./config/config");
const merchantRoutes = require("./src/routes/merchantRoutes");
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");
const customerRoutes = require("./src/routes/customerRoutes");

dotenv.config();
const app = express();
dataBaseConnect();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(`/api/merchants`, merchantRoutes);
app.use(`/api/products`, productRoutes);
app.use(`/api/auth`, authRoutes);
app.use(`/api/customer`, customerRoutes);

app.listen(PORT, () => {
  console.log(`server is listeng on PORT`);
});

// MONGO_URI=mongodb+srv://fmdavids:fmTodoapp123@merntodoapp.t6g4q.mongodb.net/nerdyEyeE-commerce?retryWrites=true&w=majority
