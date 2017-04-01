SELECT orders.id, orders.clientid, SUM(floor_plans.price) as price
FROM orders_products
JOIN orders
ON orders.id = orders_products.order_id
JOIN floor_plans
ON orders_products.product_id = floor_plans.id
WHERE orders.clientid = 1
GROUP BY orders.id;
