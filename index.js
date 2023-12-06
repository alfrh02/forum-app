var express = require("express");
var ejs = require("ejs");
var mysql = require("mysql");

const port = 8000;
const app = express();

const db = mysql.createConnection({ // connect to database
    host: "localhost",
    user: "appuser",
    password: "forumapp",
    database: "forum"
})

let data = { // data for each site to have access to
    siteName: "Alforum",
    // dummyTopics: ["topic1", "topic2", "topic3"],
    // dummyUsers: ["akhoj", "laf", "woopa woo"]
}

app.set("views", __dirname + "/views");         // set the views directory for express to pick up files from
app.set("view engine", "ejs");                  // set EJS as our views engine
app.engine("html", ejs.renderFile);             // tell express to use EJS to render HTML files
app.use(express.static(__dirname + "/public")); // tell express to use the `public/` folder for files to serve to the client (such as css)

// express routing
app.get("/", function(req, res) {
    res.render("index.ejs", data);
});

app.get("/about", function(req, res) {
    res.render("about.ejs", data);
});

app.get("/users", function(req, res) {
    // list all users via SQL query
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("users.ejs", data);
        }
    });
});

app.get("/user/:username", function(req, res) {
    // append username to data object so that it can be used with EJS
    db.query("SELECT * FROM users WHERE name LIKE '" + req.params.username + "'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            console.log(data);
            res.render("profile.ejs", data);
        }
    })
});

app.get("/posts", function(req, res) {
    // list all posts via SQL query
    res.render("about.ejs", data);
});

app.get("/posts/:postname", function(req, res) {
    // list all posts via SQL query
    res.render("about.ejs", data);
});

app.get("/topics", function(req, res) {
    // list all topics via SQL query
    res.render("topics.ejs", data);
});

app.get("/topics/:topicname", function(req, res) {
    // apend topic name to data object so that it can be used with EJS
    data.topicname = req.params.topicname;
    res.render("topic.ejs", data);
});

app.get("/newpost", function(req, res) {
    res.render("newpost.ejs", data);
});

app.get("/search", function(req, res) {
    res.render("search.ejs", data);
});

app.listen(port); // start site