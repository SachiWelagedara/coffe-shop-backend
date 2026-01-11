const db = require("../config/db");

const Product = {
    getAll: (callback) => {
        db.query("SELECT * FROM products", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM products WHERE id = ?", [id], callback);
    },

    create: (data, callback) => {
        const sql = `
            INSERT INTO products (category_id, name, price, stock)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, [data.category_id, data.name, data.price, data.stock], callback);
    },

    update: (id, data, callback) => {
        const sql = `
            UPDATE products
            SET category_id = ?, name = ?, price = ?, stock = ?
            WHERE id = ?
        `;
        db.query(
            sql,
            [data.category_id, data.name, data.price, data.stock, id],
            callback
        );
    },

    updateStock: (id, stock, callback) => {
        const sql = "UPDATE products SET stock = ? WHERE id = ?";
        db.query(sql, [stock, id], callback);
    },

    remove: (id, callback) => {
        db.query("DELETE FROM products WHERE id = ?", [id], callback);
    }
};

module.exports = Product;
