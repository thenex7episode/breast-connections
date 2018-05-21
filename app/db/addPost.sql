INSERT INTO posts_bc (category, title, body, user_id, tracker, date) VALUES ($1, $2, $3, $4, 0, CURRENT_DATE);
SELECT * FROM posts_bc;