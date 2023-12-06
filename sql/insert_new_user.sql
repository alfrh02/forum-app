USE forum;
INSERT INTO users (name, password, description, creationDate)VALUES(
	CONCAT("user", FLOOR(1000 + RAND() * 5000)),
    UUID(),
    NULL,
    NOW()
)