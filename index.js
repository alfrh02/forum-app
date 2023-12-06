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

const data = { // data for each site to have access to
    siteName: "Forum Name"
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
    res.render("users.ejs", data);
});

// app.get("/users/grtjgirj", function(req, res) {
//     res.render("users.ejs", data);
// });

app.get("/posts", function(req, res) {
    // list all posts via SQL query
    res.render("about.ejs", data);
});

app.get("/topics", function(req, res) {
    // list all topics via SQL query
    res.render("topics.ejs", data);
});

app.get("/newpost", function(req, res) {
    res.render("newpost.ejs", data);
});

app.get("/search", function(req, res) {
    res.render("search.ejs", data);
});

app.listen(port); // start site