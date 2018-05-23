UPDATE posts_bc SET title = $1, body = $2 WHERE post_id = $3;
SELECT * FROM posts_bc WHERE post_id = $3;