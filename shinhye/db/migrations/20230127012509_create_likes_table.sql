-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    like_user_id INT NOT NULL,
    liked_post_id INT NOT NULL,
    liked BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Like_User_ID FOREIGN KEY (like_user_id) REFERENCES users(id),
    CONSTRAINT FK_Liked_Post_ID FOREIGN KEY (liked_post_id) REFERENCES posts(id),
    CONSTRAINT UQ_Like UNIQUE (like_user_id,liked_post_id)
);

-- migrate:down
DROP TABLE likes;
