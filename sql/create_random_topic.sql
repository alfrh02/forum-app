USE forum;
INSERT INTO topics (topicName, topicDescription, topicCreationDate)VALUES(
	CONCAT("topic", FLOOR(1000 + RAND() * 5000)),
    UUID(),
    NOW()
);