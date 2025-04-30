const Order = require("../models/order");

exports.orders = async (req, res) => {
  try {
    let allOrders = await Order.find({})
      .sort("-createdAt")
      .populate({
        path: "products.product",
        select: "title price",
      })
      .populate({
        path: "orderdBy",
        select: "address",
      })
      .exec();

    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.orderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    let updated = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
