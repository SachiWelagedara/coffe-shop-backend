const db = require("../config/db");
const bcrypt = require("bcrypt");

const User = {
    register: (data, callback) => {
        bcrypt.hash(data.password, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
            db.query(sql, [data.username, data.email, hashedPassword, data.role], callback);
        });
    },

    login: (data, callback) => {
        const sql = "SELECT * FROM users WHERE email = ?";
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

module.exports = User;
