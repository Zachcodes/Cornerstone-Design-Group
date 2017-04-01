SELECT *
FROM clients_login
JOIN client_info
	ON client_info.client_id = clients_login.id;
