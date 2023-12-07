USE forum;
INSERT INTO users (userName, userPassword, userDescription, userCreationDate)VALUES(
	CONCAT("user", FLOOR(1000 + RAND() * 5000)),
    UUID(),
    UUID(),
    NOW()
);

INSERT INTO topics (topicName, topicDescription, topicCreationDate)VALUES(
	CONCAT("topic", FLOOR(1000 + RAND() * 5000)),
    UUID(),
    NOW()
);

INSERT INTO posts (userName, topicName, postName, postBody, postCreationDate)VALUES(
    (SELECT userName FROM users ORDER BY RAND() LIMIT 1),
    (SELECT topicName FROM topics ORDER BY RAND() LIMIT 1),
    UUID(),
    UUID(),
    NOW()
);