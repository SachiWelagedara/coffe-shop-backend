const category = require("../services/category.service");

exports.getAll = (req, res) => {
    category.getAll((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.create = (req, res) => {
    category.create(req.body, err => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Category added "});
    });
};