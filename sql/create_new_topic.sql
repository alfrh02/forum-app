USE forum;
INSERT INTO topics (name, description, creationDate)VALUES(
	CONCAT("topic", FLOOR(1000 + RAND() * 5000)),
    "this is a topic",
    NOW()
);