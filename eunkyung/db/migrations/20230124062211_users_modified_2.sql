-- migrate:up
ALTER TABLE users ADD users_profile_image VARCHAR(300) NULL AFTER created_at;

-- migrate:down
DROP TABLE uers;

