const mongoose = require('mongoose')

const orderSchema = new mongoose({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order