SELECT orders.id, orders_products.product_id, orders.clientid, floor_plans.floor_plan_name, floor_plans.image, SUM(floor_plans.price) as price, count(orders_products.product_id) as number_of_plans
FROM orders_products
JOIN orders
ON orders.id = orders_products.order_id
JOIN floor_plans
ON orders_products.product_id = floor_plans.id
GROUP BY orders.id, orders_products.product_id, orders.clientid, floor_plans.floor_plan_name, floor_plans.image;
