select client_login.username, client.name, client.id, client.name
from client
join client_login
on client_login.client_id = client.id
where username = $1;
