import Order from '../mongodb/models/order.js'

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('items.productId');
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const orderExists = await Order.findOne({ _id: id });

  if (orderExists) {
    res.status(200).json(orderExists);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { isDelivered } = req.body;

  try {
    const order = await Order.findById(id);
    if (order) {
      order.isDelivered = isDelivered;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
};

const createOrder = async (req, res) => {
    try {
        const { 
            items,
            totalPrice,
            customerDetails,
        } = req.body

        const newOrder = await Order.create({
            items,
            totalPrice,
            customerDetails,
        })

        res.status(200).json({ message: 'Order created successfully', order: newOrder})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;

      const orderToDelete = await Order.findById(id);
  
      if (!orderToDelete) throw new Error("Order not found");

      await Order.deleteOne({ _id: id });
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export {
    getAllOrders,
    deleteOrder,
    createOrder,
    updateOrder,
    getOrderDetail
}
