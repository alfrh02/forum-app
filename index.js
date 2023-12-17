var express = require("express");
var ejs = require("ejs");
var mysql = require("mysql");
var bodyParser = require("body-parser");

const port = 8000;
const app = express();

const db = mysql.createConnection({ // connect to database
    host: "localhost",
    user: "appuser",
    password: "forumapp",
    database: "forum",
    timezone: "local",
    dateStrings: true
})

let data = { // data for each site to have access to
    siteName: "Alforum"
}

app.set("views", __dirname + "/views");          // set the views directory for express to pick up files from
app.set("view engine", "ejs");                   // set EJS as our views engine
app.engine("html", ejs.renderFile);              // tell express to use EJS to render HTML files
app.use(express.static(__dirname + "/public"));  // tell express to use the `public/` folder for files to serve to the client (such as css)
app.use(bodyParser.urlencoded({extended: true})) // use bodyParser for access to req.body for form submissions

// --------------------------------------------------------- misc
app.get("/", function(req, res) {
    res.render("homepage.ejs", data);
});

app.get("/about", function(req, res) {
    res.render("about.ejs", data);
});

app.post("/searchresult", function(req, res) {

    // NOTE: we are using .slice(0, -1) on strings that represent the names of tables in order to get the "name" row associated with that table
    // i.e. we need to get postName/topicName/userName from the posts/topics/users table, so we simply cut off the "s" from "posts"/"topics"/"users" and append "Name".

    let query = "";

    let queryItems = new Map();

    // columns with conflicting names are alias'd using the AS keyword
    queryItems.set("users", "users.userName AS user_userName, userDescription, userCreationDate");
    queryItems.set("posts", "posts.postName AS post_postName, postId, posts.topicName AS post_topicName, posts.userName AS post_userName");
    queryItems.set("topics", "topics.topicName AS topic_topicName");

    options = []
    if (Array.isArray(req.body.radio)) {
        let select = ""
        let tables = []
        let tableRowNames = []

        for (let i = 0; i < req.body.radio.length; i++) {
            // prepare tableRowNames for querying @ line 78
            if (req.body.radio[i] == "users") {
                tableRowNames.push("user_userName")
            } else if (req.body.radio[i] == "posts") {
                tableRowNames.push("post_postName");
            } else {
                tableRowNames.push("topic_topicName");
            }


            select += queryItems.get(req.body.radio[i]) + ","; // final comma is sliced off
            tables.push(req.body.radio[i]);
            options.push(req.body.radio[i]);
        }

        query = "SELECT " + select.slice(0, -1) + " FROM " + tables[0] + " CROSS JOIN " + tables[1]

        if (tables.length == 3) {
            query += " CROSS JOIN " + tables[2];
        }

        // incorporate query as subquery, for searching names
        query = "SELECT DISTINCT * FROM (" + query + ") AS result WHERE "
        for (let i = 0; i < tableRowNames.length; i++) {
            query += tableRowNames[i] + " LIKE '%" + req.body.search + "%'";
            if (i != tableRowNames.length - 1) {
                query += " OR "
            }
        }
    } else {
        query = "SELECT " + queryItems.get(req.body.radio) + " FROM " + req.body.radio + " WHERE " + req.body.radio.slice(0, -1) + "Name LIKE '%" + req.body.search + "%'";
        options.push(req.body.radio);
    }

    console.log(query);
    db.query(query, (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result}, {options:options});
            res.render("search/index.ejs", data);
        }
    })
});
// ------------------------------------------------------ posts
app.get("/posts", function(req, res) {
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("posts/posts.ejs", data);
        }
    })
});

app.get("/topic/:topicname/:postid", function(req, res) {
    db.query("SELECT * FROM posts WHERE postId = " + req.params.postid, (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result[0]});
            res.render("posts/post.ejs", data);
        }
    })
});

app.get("/newpost", function(req, res) {
    data = Object.assign({}, data, alreadyfailed = false);
    db.query("SELECT topicName from topics", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result})
            res.render("posts/newpost.ejs", data);
        }
    });
});

app.post("/postsubmitted", function(req, res) {
    let incorrectCredentials = false;

    // check if username and password are correct
    db.query("SELECT userName FROM users WHERE userPassword = '" + req.body.password + "'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            if (result[0] === undefined) { // password does not correlate to any account
                incorrectCredentials = true;
                return;
            }
            if (result[0].userName != req.body.username) { // incorrect password-username combination
                incorrectCredentials = true;
                return;
            }
        }
    });

    // check if the user is a member of the topic they are posting to
    db.query("SELECT userName FROM memberships WHERE userName = '" + req.body.username + "'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            if (result[0] == undefined) { // user is not part of the topic, and cannot post
                incorrectCredentials = true;
                return;
            }
        }
    });

    if (incorrectCredentials) {
        data = Object.assign({}, data, alreadyfailed = true, {previous:req.body})
        res.render("posts/newpost.ejs", data);
        return;
    }

    let sqlquery = "INSERT INTO posts (userName, topicName, postName, postBody, postCreationDate)VALUES(" +
        "'" + req.body.username + "', " +
        "'" + req.body.topic + "', " +
        "'" + req.body.posttitle + "', " +
        "'" + req.body.postbody + "', " +
        "NOW()" +
    ")";

    db.query(sqlquery, (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.redirect("/posts")
        }
    });
});
// ----------------------------------------------------- topics
app.get("/topics", function(req, res) {
    db.query("SELECT * FROM topics", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("topics/topics.ejs", data);
        }
    });
});

app.get("/topic/:topicname", function(req, res) {
    let query = "SELECT * FROM topics LEFT OUTER JOIN posts ON posts.topicName = '" + req.params.topicname + "'";
    console.log(query)
    db.query(query, (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result}, alreadyfailed = false);
            res.render("topics/topic.ejs", data);
        }
    });
});

app.get("/newtopic", function(req, res) {
    data = Object.assign({}, data, alreadyfailed = false);
    res.render("topics/newtopic.ejs", data);
});

app.post("/topicsubmitted", function(req, res) {
    let incorrectCredentials = false;

    // check if username and password are correct
    db.query("SELECT userName FROM users WHERE userPassword = '" + req.body.password + "'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            if (result[0] == undefined) { // password does not correlate to any account
                incorrectCredentials = true;
                return;
            }
            if (result[0].userName != req.body.username || result[0].userName != "admin") { // incorrect password-username combination, or not admin
                incorrectCredentials = true;
                return;
            }
        }
    });

    if (incorrectCredentials) {
        data = Object.assign({}, data, alreadyfailed = true, {previous:req.body})
        res.render("newpost.ejs", data);
        return;
    }

    let topicquery = "INSERT INTO topics (topicName, topicDescription, topicCreationDate)VALUES(" +
        "'" + req.body.topicname + "', " +
        "'" + req.body.topicdescription + "', " +
        "NOW()" +
    ")";

    db.query(topicquery, (err, result) => {
        if (err) {
            console.error(err.message);
            res.redirect("/newtopic");
        } else {
            data = Object.assign({}, data, {result:result});
            res.redirect("/topics")
        }
    });

    let postquery = "INSERT INTO posts (postName, postBody, topicName postCreationDate)VALUES(" +
        "'Welcome'," +
        "'Welcome to " + req.body.topicname + ".'," +
        "'" + req.body.topicname + "', " +
        "NOW()" +
    ")";

    db.query(postquery, (err) => {
        if (err) {
            console.error(err.message);
        }
    })

});

app.post("/jointopic/:topicname", function(req, res) {
    let incorrectCredentials = false;

    // check if username and password are correct
    db.query("SELECT userName FROM users WHERE userPassword = '" + req.body.password + "'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            if (result[0] == undefined) { // password does not correlate to any account
                incorrectCredentials = true;
                return;
            }
            if (result[0].userName != req.body.username) { // incorrect password-username combination
                incorrectCredentials = true;
                return;
            }
        }
    });

    // check if the user is already part of the topic they are trying to join
    db.query("SELECT topicName FROM memberships WHERE userName = '" + req.body.username + "'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            // iterate through results to find a matching topic name. if one is found, reject their join request
            for (let i = 0; i < result.length; i++) {
                if (result[i].topicName == req.params.topicname) {
                    incorrectCredentials = true;
                }
            }

            if (incorrectCredentials) {
                res.redirect("/topic/" + req.params.topicname);
                return;
            }

            let sqlquery = "INSERT INTO memberships (userName, topicName, joinDate)VALUES(" +
                "'" + req.body.username + "', " +
                "'" + req.params.topicname + "', " +
                "NOW()" +
            ")";

            db.query(sqlquery, (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    res.render("success.ejs", data)
                }
            });
        }
    })
})

// ------------------------------------------------------ users
app.get("/users", function(req, res) {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("users/users.ejs", data);
        }
    });
});

app.get("/user/:username", function(req, res) {
    let subquery = "SELECT users.userName, userDescription, userCreationDate, postName, postBody, postId, topicName FROM users LEFT OUTER JOIN posts ON posts.userName = users.userName"
    let query = "SELECT * FROM (" + subquery + ") AS result WHERE userName = '" + req.params.username + "'"

    db.query(query, (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result: result});
            res.render("users/user.ejs", data)
        }
    })
});

app.get("/register", function (req, res) {
    data = Object.assign({}, data, alreadyfailed = false);
    res.render("register.ejs", data);
});

app.post("/registered", function(req, res) {
    if (req.body.password != req.body.redo_password) {
        data = Object.assign({}, data, alreadyfailed = true);
        res.render("register.ejs", data);
        return;
    }

    sqlquery = "INSERT INTO users (userName, userPassword, userDescription, userCreationDate)VALUES(" +
        "'" + req.body.username + "', " +
        "'" + req.body.password + "', " +
        "NULL," +
        "NOW()" +
    ")";

    db.query(sqlquery, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            res.render("success.ejs", data);
        }
    });
});

app.listen(port); // start site