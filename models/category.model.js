const db = require("../config/db");

exports.getAll = Callback => {
    db.query("SELECT * FROM categories", Callback);
};

exports.create = (data, Callback) => {
    db.query("INSERT INTO categories (name, description) VALUES (?, ?)", [data.name, data.description], Callback);
};