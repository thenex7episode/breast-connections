Insert into users_bc (username, email, first, last, password, admin) values ($1, $2, $3, $4,$5, false)
Returning *;