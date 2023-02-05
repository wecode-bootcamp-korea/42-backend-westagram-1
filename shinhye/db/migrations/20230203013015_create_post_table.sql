-- migrate:up
CREATE TABLE posts (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(100) NOT NULL,
  content varchar(3000) DEFAULT NULL,
  user int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  KEY user_id (user),
  CONSTRAINT posts_ibfk_1 FOREIGN KEY (user) REFERENCES users (id)
);

-- migrate:down
DROP TABLE posts;
