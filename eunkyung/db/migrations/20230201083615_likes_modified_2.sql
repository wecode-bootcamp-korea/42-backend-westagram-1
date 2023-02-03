-- migrate:up
ALTER TABLE likes DROP CONSTRAINT likes_user_id_post_id_ukey;

-- migrate:down
DROP TABLE likes;
