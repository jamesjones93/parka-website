DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) UNIQUE,
    access_code INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
