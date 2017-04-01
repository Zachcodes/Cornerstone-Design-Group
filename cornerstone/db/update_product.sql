UPDATE orders_products
SET count = $1
WHERE order_id = $2
and product_id = $3;
