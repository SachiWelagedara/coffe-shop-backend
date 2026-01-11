const User = require("../models/user.model");

exports.register = (req, res) => {
    User.register(req.body, (err, result) => {
        if (err) return res.status(400).json(err);
        res.json({ message: "User registered successfully" });
    });
};

exports.login = (req, res) => {
    User.login(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0)
            return res.status(401).json({ message: "Invalid credentials" });

        res.json({
            message: "Login successful",
            user: result[0]
        });
    });
};
