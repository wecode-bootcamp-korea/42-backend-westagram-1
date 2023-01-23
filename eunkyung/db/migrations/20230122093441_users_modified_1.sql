-- migrate:up
ALTER TABLE users ADD CONSTRAINT users_email_ukey UNIQUE (email);

-- migrate:down
DROP TABLE users;
