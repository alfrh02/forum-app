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

CREATE USER "appuser"@"localhost" IDENTIFIED WITH mysql_native_password BY "forumapp";
GRANT ALL PRIVILEGES ON forum.* TO "appuser"@"localhost";