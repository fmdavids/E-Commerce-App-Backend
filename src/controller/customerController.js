const Customer = require("../models/customerSchema");


const getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await Customer.find({});

        res.status(200).json({
            success: true,
            msg: "Details of all Customer",
            data: allCustomers,
          });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Encounter error! Customer could not be found",
            data: error,
          });
    }
}


const getCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const detail = await Customer.findOne({_id:id});
        res.status(200).json({
            success:true,
            msg: `found ${id}`,
            data: detail
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Encounter error! Customer could not be found",
            data: error,
          });
    }
}
const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const payLoad = req.body;
        // const {id} = req.Customer;
        // const payLoad = req.body;
        const updadateStore = await Customer.findByIdAndUpdate({_id:id}, payLoad, {new: true})
        res.status(200).json({
            success:true,
            msg: `found ${id} and updated`,
            data: updadateStore
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Customer not updated",
            data: error
          });
    }
}
const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const detail = await Customer.findByIdAndDelete({_id:id});
        res.status(200).json({
            success:true,
            msg: `found ${id} and deleted it`,
            data: detail
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Customer not deleted",
            data: error
          });
    }
}

module.exports = {getAllCustomers, getCustomer, updateCustomer, deleteCustomer};
