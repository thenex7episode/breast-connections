UPDATE experiences_bc SET body = $1, rating =$2 WHERE place_id = $3;
SELECT * FROM experiences_bc WHERE place_id = $3;