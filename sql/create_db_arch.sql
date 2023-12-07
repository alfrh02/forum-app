-- arch linux relies on the MySQL fork MariaDB due to Oracle being anti-open source.
-- This file practically does the same as create_db.sql, but user setup is slightly different.
-- This is only for people running Arch Linux/MariaDB locally. Linux servers that are running the original MySQL client
-- should use create_db.sql.

CREATE DATABASE forum;
USE forum;

CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(32) UNIQUE,
    userPassword VARCHAR(256) NOT NULL,
    userDescription VARCHAR(256),
    userCreationDate DATE
);

CREATE TABLE topics (
    topicId INT PRIMARY KEY AUTO_INCREMENT,
    topicName VARCHAR(32),
    topicDescription VARCHAR(256),
    topicCreationDate DATE
);

CREATE TABLE memberships (
    userId INT,
    topicId INT,
    joinDate DATE,
    FOREIGN KEY(userId) REFERENCES users(userId),
    FOREIGN KEY(topicId) REFERENCES topics(topicId)
);

CREATE TABLE posts (
    postId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    topicId INT,
    postName VARCHAR(64),
    postBody TEXT,
    postCreationDate DATE,
    FOREIGN KEY(userId) REFERENCES users(userId),
    FOREIGN KEY(topicId) REFERENCES topics(topicId)
);

CREATE USER "appuser"@"localhost" IDENTIFIED BY "forumapp";
GRANT ALL PRIVILEGES ON forum.* TO "appuser"@"localhost";