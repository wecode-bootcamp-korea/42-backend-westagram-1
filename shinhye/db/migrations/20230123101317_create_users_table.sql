-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(512) NOT NULL,
    first_name VARCHAR(512) NOT NULL,
    last_name VARCHAR(512) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(512) NOT NULL UNIQUE,
    profile_image VARCHAR(512) NULL,
    password VARCHAR(512) NOT NULL
);

-- migrate:down
DROP TABLE users;
