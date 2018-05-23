DELETE FROM comments_bc WHERE comment_id = $1;
SELECT * FROM comments_bc WHERE post_id = $2;