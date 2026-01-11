const db = require("../config/db");

const Order = {
    create: (data, callback) => {
        // Create order 
        const orderSql = "INSERT INTO orders (customer_id, total_amount) VALUES (?, ?)";

        db.query(orderSql, [data.customer_id, 0], (err, orderResult) => {
            if (err) return callback(err);

            const orderId = orderResult.insertId;
            let totalAmount = 0;

            const insertItem = (index) => {
                if (index >= data.items.length) {
                    // Update total amount
                    const updateSql = "UPDATE orders SET total_amount = ? WHERE id = ?";
                    return db.query(updateSql, [totalAmount, orderId], (err) => {
                        if (err) return callback(err);
                        callback(null, { orderId, totalAmount });
                    });
                }

                const item = data.items[index];

                const productSql = "SELECT price FROM products WHERE id = ?";
                db.query(productSql, [item.product_id], (err, productResult) => {
                    if (err || productResult.length === 0)
                        return callback({ message: "Product not found" });

                    const productPrice = productResult[0].price;
                    const itemTotal = productPrice * item.quantity;
                    totalAmount += itemTotal;

                    const itemSql = `
                        INSERT INTO order_items (order_id, product_id, quantity, price)
                        VALUES (?, ?, ?, ?)
                    `;

                    db.query(
                        itemSql,
                        [orderId, item.product_id, item.quantity, itemTotal],
                        (err) => {
                            if (err) return callback(err);
                            insertItem(index + 1);
                        }
                    );
                });
            };

            insertItem(0);
        });
    },

    getAll: (callback) => {
        const sql = "SELECT * FROM orders";
        db.query(sql, callback);
    }
};

module.exports = Order;
