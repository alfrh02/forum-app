CREATE DATABASE forum;
USE forum;
/*
CREATE TABLE users (
    userId INT PRIMARY KEY,
    name VARCHAR(32),
    password VARCHAR(256) NOT NULL,
    creationDate DATE(),
);

CREATE TABLE memberships (
    userId INT,
    topicId INT,
    FOREIGN KEY(userId) REFERENCES users(userId),
    FOREIGN KEY(topicId) REFERENCES topics(topicId)
);

CREATE TABLE topics (
    topicId INT PRIMARY KEY,
    name VARCHAR(32),
    creationDate DATE()
);

CREATE TABLE posts (
    postId INT PRIMARY KEY,
    userId INT,
    topicId INT,
    name VARCHAR(64),
    body TEXT,
    creationDate DATE(),
    FOREIGN KEY(userId) REFERENCES users(userId),
    FOREIGN KEY(topicId) REFERENCES topics(topicId),
)
*/
CREATE USER "appuser"@"localhost" IDENTIFIED BY "forumapp";
GRANT ALL PRIVILEGES ON forum.* TO "appuser"@"localhost";