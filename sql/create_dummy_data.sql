USE forum;
INSERT INTO users (userName, userPassword, userDescription, userCreationDate)VALUES(
	"john",
    UUID(),
    UUID(),
    NOW()
);

INSERT INTO users (userName, userPassword, userDescription, userCreationDate)VALUES(
	"paul",
    UUID(),
    UUID(),
    NOW()
);

INSERT INTO users (userName, userPassword, userDescription, userCreationDate)VALUES(
	"george",
    UUID(),
    UUID(),
    NOW()
);

INSERT INTO users (userName, userPassword, userDescription, userCreationDate)VALUES(
	"ringo",
    UUID(),
    UUID(),
    NOW()
);

INSERT INTO topics (topicName, topicDescription, topicCreationDate)VALUES(
	"Music",
    "Chat about all kinds of music.",
    NOW()
);

INSERT INTO posts (postName, postBody, topicName, postCreationDate)VALUES(
    "Welcome",
    "Welcome to Music.",
    "Music",
    NOW()
)

INSERT INTO topics (topicName, topicDescription, topicCreationDate)VALUES(
	"Politics",
    "Stay away",
    NOW()
);

INSERT INTO topics (topicName, topicDescription, topicCreationDate)VALUES(
	"Relationship Advice",
    "Also stay away",
    NOW()
);