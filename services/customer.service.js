const db = require("../config/db");
const bcrypt = require("bcrypt");

const Customer = {
    register: (data, callback) => {
        bcrypt.hash(data.password, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            const sql = "INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)";
            db.query(sql, [data.name, data.email, data.phone, hashedPassword], callback);
        });
    },

    login: (data, callback) => {
        const sql = "SELECT id, name, email, phone, password FROM customers WHERE email = ?";
        db.query(sql, [data.email], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, []);

            const user = results[0];
            bcrypt.compare(data.password, user.password, (err, isMatch) => {
                if (err) return callback(err);
                if (!isMatch) return callback(null, []);

                delete user.password;
                callback(null, [user]);
            });
        });
    }
};

module.exports = Customer;
