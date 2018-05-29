INSERT INTO experiences_bc (body, user_id, place_id, rating) VALUES ($1, $2, $3, $4);
SELECT * FROM experiences_bc WHERE place_id = $3;