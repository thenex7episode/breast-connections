UPDATE posts_bc SET tracker = $2 WHERE post_id = $1 RETURNING *;