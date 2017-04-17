SELECT * FROM client WHERE id=(select max(id) from client)
