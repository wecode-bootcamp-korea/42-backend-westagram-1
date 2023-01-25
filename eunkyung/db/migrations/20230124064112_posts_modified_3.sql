-- migrate:up
ALTER TABLE posts CHANGE description content VARCHAR(3000) NOT NULL; 

-- migrate:down
DROP TABLE posts;

