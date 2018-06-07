INSERT INTO messages_bc (sender, receiver, body, sender_id, receiver_id, chat_id) VALUES ($1, $3, $2, $4, $5, $6);
SELECT * FROM messages_bc WHERE chat_id = $6;