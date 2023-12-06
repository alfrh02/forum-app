CREATE DATABASE forum;
USE forum;
/*
CREATE TABLE users (
    name VARCHAR(30) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    creationDate DATE(),
);

CREATE TABLE topics (
    name VARCHAR(30) PRIMARY KEY,
    creationDate DATE()
);
 */
CREATE USER "appuser"@"localhost" IDENTIFIED BY "forumapp";
GRANT ALL PRIVILEGES ON forum.* TO "appuser"@"localhost";