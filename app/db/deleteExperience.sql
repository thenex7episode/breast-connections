DELETE FROM experiences_bc WHERE experience_id = $1;
SELECT * FROM experiences_bc WHERE $2;