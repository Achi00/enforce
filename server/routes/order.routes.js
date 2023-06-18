import express from "express";

import {
  getAllOrders,
  deleteOrder,
  createOrder,
  getOrderDetail,
  updateOrder,
  processPayment,
} from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").get(getAllOrders);
router.route("/process_payment").post(processPayment);
router.route("/").post(createOrder);
router.route("/:id").get(getOrderDetail);
router.route("/:id").put(updateOrder);
router.route("/:id").delete(deleteOrder);

export default router;
