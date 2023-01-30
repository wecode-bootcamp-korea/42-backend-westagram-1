-- migrate:up
ALTER TABLE likes ADD CONSTRAINT likes_user_id_post_id_ukey UNIQUE (user_id,post_id);

-- migrate:down
DROP TABLE likes;
