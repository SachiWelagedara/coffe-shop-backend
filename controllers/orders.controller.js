const Order = require("../services/order.service");

exports.createOrder = (req, res) => {
    Order.create(req.body, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }

        res.status(201).json({
            message: "Order placed successfully",
            order_id: result.orderId,
            total_amount: result.totalAmount
        });
    });
};

exports.getOrders = (req, res) => {
    Order.getAll((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};
