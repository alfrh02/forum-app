-- arch linux relies on the MySQL fork MariaDB due to Oracle being anti-open source.
-- This file practically does the same as create_db.sql, but user setup is slightly different.
-- This is only for people running Arch Linux/MariaDB locally. Linux servers that are running the original MySQL client
-- should use create_db.sql.

CREATE DATABASE forum;
USE forum;

CREATE TABLE users (
    userName VARCHAR(32) PRIMARY KEY,
    userPassword VARCHAR(256) NOT NULL,
    userDescription VARCHAR(256),
    userCreationDate DATE
);

CREATE TABLE topics (
    topicName VARCHAR(32) PRIMARY KEY,
    topicDescription VARCHAR(256),
    topicCreationDate DATE
);

CREATE TABLE memberships (
    userName VARCHAR(32),
    topicName VARCHAR(32),
    joinDate DATE,
    FOREIGN KEY(userName) REFERENCES users(userName),
    FOREIGN KEY(topicName) REFERENCES topics(topicName)
);

CREATE TABLE posts (
    postId INT PRIMARY KEY AUTO_INCREMENT,
    postName VARCHAR(64),
    postBody TEXT,
    postCreationDate DATE,
    userName VARCHAR(32),
    topicName VARCHAR(32),
    FOREIGN KEY(userName) REFERENCES users(userName),
    FOREIGN KEY(topicName) REFERENCES topics(topicName)
);

CREATE USER "appuser"@"localhost" IDENTIFIED BY "forumapp";
GRANT ALL PRIVILEGES ON forum.* TO "appuser"@"localhost";