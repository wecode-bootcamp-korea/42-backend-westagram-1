-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT FK_Like_User_ID FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_Liked_Post_ID FOREIGN KEY (post_id) REFERENCES posts(id),
    CONSTRAINT UQ_Like UNIQUE (user_id,post_id)
);

-- migrate:down
DROP TABLE likes;
