const Customer = require("../models/customer.model");

exports.register = (req, res) => {
    Customer.register(req.body, (err) => {
        if (err) return res.status(400).json(err);
        res.json({ message: "Customer registered successfully" });
    });
};

exports.login = (req, res) => {
    Customer.login(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0)
            return res.status(401).json({ message: "Invalid credentials" });

        res.json({
            message: "Login successful",
            customer: result[0]
        });
    });
};
