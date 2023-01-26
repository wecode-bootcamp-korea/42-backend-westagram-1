-- migrate:up
ALTER TABLE posts ADD post_image_url VARCHAR(300) NULL AFTER created_at;

-- migrate:down
DROP TABLE posts;
