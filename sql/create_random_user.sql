USE forum;
INSERT INTO users (userName, userPassword, userDescription, userCreationDate)VALUES(
	CONCAT("user", FLOOR(1000 + RAND() * 5000)),
    UUID(),
    UUID(),
    NOW()
);