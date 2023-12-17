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

CREATE USER "appuser"@"localhost" IDENTIFIED WITH mysql_native_password BY "forumapp";
GRANT ALL PRIVILEGES ON forum.* TO "appuser"@"localhost";