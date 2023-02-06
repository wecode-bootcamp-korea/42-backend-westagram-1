-- migrate:up
CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_url VARCHAR(512) NOT NULL,
    content VARCHAR(512) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT UQ_Post_Image_URL UNIQUE (image_url),
    CONSTRAINT FK_User_ID FOREIGN KEY (user_id) REFERENCES users(id)
);


-- migrate:down
DROP TABLE posts;