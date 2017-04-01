SELECT *
from clients_login
join client_info
	on clients_login.id = client_info.client_id;


-- this will join my clients login table and my clients info table together into one 
