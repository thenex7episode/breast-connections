DELETE FROM comments_bc WHERE post_id = $1;
DELETE FROM posts_bc WHERE post_id = $1;
SELECT * FROM posts_bc;