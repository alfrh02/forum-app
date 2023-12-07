CREATE DATABASE forum;
USE forum;

CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) UNIQUE,
    password VARCHAR(256) NOT NULL,
    description VARCHAR(256),
    creationDate DATE
);

CREATE TABLE topics (
    topicId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32),
    description VARCHAR(256),
    creationDate DATE
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
    name VARCHAR(64),
    body TEXT,
    creationDate DATE,
    FOREIGN KEY(userId) REFERENCES users(userId),
    FOREIGN KEY(topicId) REFERENCES topics(topicId)
);

CREATE USER "appuser"@"localhost" IDENTIFIED BY "forumapp";
GRANT ALL PRIVILEGES ON forum.* TO "appuser"@"localhost";