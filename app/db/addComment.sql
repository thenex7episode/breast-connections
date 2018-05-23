INSERT INTO comments_bc (body, user_id, post_id, tracker, date) VALUES ($1, $2, $3, 0, CURRENT_DATE );
SELECT * FROM comments_bc WHERE post_id = $3;