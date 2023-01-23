-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int NOT NULL,
    post_id int NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT like_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT like_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts (id)
);

-- migrate:down
DROP TABLE likes;