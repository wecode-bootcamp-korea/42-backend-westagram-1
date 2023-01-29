-- migrate:up
ALTER TABLE users MODIFY users_profile_image VARCHAR(300) NULL AFTER email;

-- migrate:down
DROP TABLE users;