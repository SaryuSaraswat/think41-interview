const express = require('express');
const router = express.Router();

const getDB = require('../db');
// const User = require('../models/User');
// const Order = require('../models/order');

router.get('/', async(req, res) => {
    try {
        const db = await getDB();
        const orders = await db.collection('orders').find({}).toArray();

        res.status(200).json({ success: true, data : orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'failed to fetch orders'
        });
    }
});

// router.get('/:id', async(req, res) => {
//     try {
//         const order = await User.findOne({id: parseInt(req.params.id)});

//         if(!order){
//             return res.status(404).json({success: false, message : 'order not found'});
//         }

//         const orderCount = await Order.countDocuments({order_id : order_id});

//         res.json({ success: true, user, orderCount});
//     } catch (error) {
//         res.status(500).json({success: false, message : error.message });
//     }
// } );

module.exports = router;