UPDATE comments_bc SET body = $2 WHERE comment_id = $1;
SELECT * FROM comments_bc WHERE comment_id = $1;