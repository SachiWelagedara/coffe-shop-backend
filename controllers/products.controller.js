const Product = require("../models/product.model");

exports.getAllProducts = (req, res) => {
    Product.getAll((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.getProductById = (req, res) => {
    Product.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0)
            return res.status(404).json({ message: "Product not found" });

        res.json(result[0]);
    });
};

exports.createProduct = (req, res) => {
    Product.create(req.body, (err, result) => {
        if (err) return res.status(400).json(err);
        res.status(201).json({ message: "Product created" });
    });
};

exports.updateProduct = (req, res) => {
    Product.update(req.params.id, req.body, (err) => {
        if (err) return res.status(400).json(err);
        res.json({ message: "Product updated" });
    });
};

exports.updateStock = (req, res) => {
    Product.updateStock(req.params.id, req.body.stock, (err) => {
        if (err) return res.status(400).json(err);
        res.json({ message: "Stock updated" });
    });
};

exports.deleteProduct = (req, res) => {
    Product.remove(req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product deleted" });
    });
};
