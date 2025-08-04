const express = require('express');
const router = express.Router();

const getDB = require('../db');
// const User = require('../models/User');
// const Order = require('../models/order');

router.get('/', async(req, res) => {
    try {
        const db = await getDB();
        const users = await db.collection('users').find({}).toArray();

        res.status(200).json({ success: true, data : users});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'failed to fetch customers'
        });
    }
});

// router.get('/:id', async(req, res) => {
//     try {
//         const user = await User.findOne({id: parseInt(req.params.id)});

//         if(!user){
//             return res.status(404).json({success: false, message : 'customer not found'});
//         }

//         const orderCount = await Order.countDocuments({user_id : user_id});

//         res.json({ success: true, user, orderCount});
//     } catch (error) {
//         res.status(500).json({success: false, message : error.message });
//     }
// } );

module.exports = router;