const Customer = require('../models/User');
const Order = require('../models/Order');

exports.getAllCustomers = async (req, res) => {
    try{
        const customers = await Customer.find();
        res.status(200).json({success : true, data : customers});
    }catch(err){
        res.status(500).json({success:false, message : err.message});
    }
}

exports.getCustomerDetails = async(req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId);
        if(!customer){
            return res.status(404).json({success: false, message: "Customer not found"});
        }

        const orders =  await Order.find({customer : customerId});

        const totalOrders = orders.length;
        const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
        const statusCount = {
            pending : 0,
            completed : 0,
            cancelled : 0
        };

        orders.forEach(order => statusCount[order.status]++);

        res.status(200).json({
            success: true,
            customer,
            orderStats : {
                totalOrders,
                totalAmount,
                statusBreakdown : statusCount
            }
        });
    } catch (error) {
        res.status(500).json({success : false, message : error.message});
    }
};

