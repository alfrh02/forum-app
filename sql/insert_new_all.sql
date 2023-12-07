USE forum;
INSERT INTO users (name, password, description, creationDate)VALUES(
	CONCAT("user", FLOOR(1000 + RAND() * 5000)),
    UUID(),
    NULL,
    NOW()
);

INSERT INTO topics (name, description, creationDate)VALUES(
	CONCAT("topic", FLOOR(1000 + RAND() * 5000)),
    "this is a topic",
    NOW()
);

INSERT INTO posts (userId, topicId, name, body, creationDate)VALUES(
    1,
    1,
    "Name",
    "Body",
    NOW()
);