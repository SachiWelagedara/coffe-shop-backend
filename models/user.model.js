const db = require("../config/db");

const User = {
    register: (data, callback) => {
        const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(sql, [data.username, data.email, data.password, data.role], callback);
    },

    login: (data, callback) => {
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        db.query(sql, [data.email, data.password], callback);
    }
};

module.exports = User;