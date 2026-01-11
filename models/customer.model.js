const db = require("../config/db");

const Customer = {
    register: (data, callback) => {
        const sql = "INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)";
        db.query(sql, [data.name, data.email, data.phone, data.password], callback);
    },

    login: (data, callback) => {
        const sql = "SELECT id, name, email, phone FROM customers WHERE email = ? AND password = ?";
        db.query(sql, [data.email, data.password], callback);
    }
};

module.exports = Customer;
