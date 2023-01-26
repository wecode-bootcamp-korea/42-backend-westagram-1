-- migrate:up
ALTER TABLE users CHANGE users_profile_image profile_image VARCHAR(300) NULL; 

-- migrate:down
DROP TABLE users;
