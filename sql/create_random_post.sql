USE forum;
INSERT INTO posts (userName, topicName, postName, postBody, postCreationDate)VALUES(
    (SELECT userName FROM users ORDER BY RAND() LIMIT 1),
    (SELECT topicName FROM topics ORDER BY RAND() LIMIT 1),
    UUID(),
    UUID(),
    NOW()
);