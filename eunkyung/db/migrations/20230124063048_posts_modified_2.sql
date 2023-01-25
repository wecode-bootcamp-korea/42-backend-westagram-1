-- migrate:up
ALTER TABLE posts MODIFY post_image_url VARCHAR(1000) NULL AFTER description;

-- migrate:down
DROP TABLE posts;
