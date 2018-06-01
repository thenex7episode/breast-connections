INSERT INTO messages_bc (sender, receiver, body) VALUES ($1, $3, $2);
SELECT * FROM messages_bc WHERE sender = $1 AND receiver = $3;