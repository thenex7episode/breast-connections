delete from comments_bc where user_id = $1;
delete from posts_bc where user_id = $1;
delete from users_bc where user_id = $1;