-- migrate:up
CREATE TABLE likes (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user int NOT NULL,
  post int NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  status BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT likes_ibfk_1 FOREIGN KEY (user) REFERENCES users (id),
  CONSTRAINT likes_ibfk_2 FOREIGN KEY (post) REFERENCES posts (id),
  CONSTRAINT UQ_Like UNIQUE (user, post));

-- migrate:down
DROP TABLE likes;
