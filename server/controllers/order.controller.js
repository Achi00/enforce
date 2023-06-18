import Order from "../mongodb/models/order.js";
import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use Environment.Production when app is in production
  merchantId: "r6nzsbk3vn4wr6bs",
  publicKey: "p9xs7nyqfd8sd6pf",
  privateKey: "d709bbfde414fa47d3a640a8b476b1d1",
});

const processPayment = async (req, res) => {
  const paymentNonce = req.body.paymentNonce;
  const amountToCharge = req.body.totalPrice;
  const deviceDataFromTheClient = req.body.deviceData;
  const postalCodeFromTheClient = req.body.postalCode;

  console.log("Payment Nonce:", paymentNonce);
  console.log("Amount to Charge:", amountToCharge);

  gateway.transaction.sale(
    {
      amount: amountToCharge,
      paymentMethodNonce: paymentNonce,
      deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
      billing: {
        postalCode: postalCodeFromTheClient,
      },
    },
    (err, result) => {
      if (err) {
        console.log("Transaction Error:", err);
        res.status(500).json({ error: err });
      } else if (!result.success) {
        console.log("Transaction Failed:", result.message);
        res.status(500).json({ error: result.message });
      } else {
        console.log("Transaction result:", result);
        console.log("Transaction ID:", result.transaction.id);
        console.log("Transaction status:", result.transaction.status);
        res.json(result);
      }
    }
  );
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("items.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const orderExists = await Order.findOne({ _id: id });

  if (orderExists) {
    res.status(200).json(orderExists);
  } else {
    res.status(404).json({ message: "Order not found" });
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
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating order" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, customerDetails } = req.body;

    const newOrder = await Order.create({
      items,
      totalPrice,
      customerDetails,
    });

    res
      .status(200)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  getOrderDetail,
  processPayment,
};
