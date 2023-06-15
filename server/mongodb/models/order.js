import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    items: [
      {
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}, // Product ID reference
        title: {type: String, required: true},
        selectedFlavor: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
      }
    ],
    totalPrice: {type: Number, required: true},
    customerDetails: {
        name: {type: String, required: true},
        address: {type: String, required: true},
        phoneNumber: {type: String, required: true},
    },
    isDelivered: {type: Boolean, default: false}
}, {timestamps: true});

const orderModel = mongoose.model('Order', OrderSchema);

export default orderModel;
