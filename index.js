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
    siteName: "Alforum",
}

app.set("views", __dirname + "/views");          // set the views directory for express to pick up files from
app.set("view engine", "ejs");                   // set EJS as our views engine
app.engine("html", ejs.renderFile);              // tell express to use EJS to render HTML files
app.use(express.static(__dirname + "/public"));  // tell express to use the `public/` folder for files to serve to the client (such as css)
app.use(bodyParser.urlencoded({extended: true})) // use bodyParser for access to req.body for form submissions

// NOTE: some query results are passed to the site as the first of an array (e.g. `result[0]`.) This is because the expected output is for one item,
// whereas db.query always gives an array. This makes the .ejs files cleaner.

// In app.get() functions where there is only one database query, the query is always named `result`. In functions with multiple queries, the results are named according to their
// table (e.g. `postsresult` or `usersresult`). The resulting data must always be passed in to the .ejs sites as `result`.

// --------------------------------------------------------- misc
app.get("/", function(req, res) {
    res.render("homepage.ejs", data);
});

app.get("/about", function(req, res) {
    res.render("about.ejs", data);
});

// -------------------------------------------------------- users
app.get("/users", function(req, res) {
    // list all users via SQL query
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result}); // append query result to data
            res.render("index/index.ejs", data);
        }
    });
});

app.get("/user/:username", function(req, res) {
    db.query("SELECT * FROM users WHERE userName LIKE '" + req.params.username + "'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result[0]});
            res.render("profiles/user.ejs", data)
        }
    } )
});

// ------------------------------------------------------ topics
app.get("/topics", function(req, res) {
    // list all topics via SQL query
    db.query("SELECT * FROM topics", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("index/index.ejs", data);
        }
    });
});

app.get("/topic/:topicname", function(req, res) {
    // this has to be two separate queries, otherwise there is redundant data being transferred in each table
    db.query("SELECT * FROM topics WHERE topicName LIKE '" + req.params.topicname + "'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result}); // append the second query to data as "result"
            res.render("profiles/topic.ejs", data);
        }
    });
});

// -------------------------------------------------------- posts
app.get("/posts", function(req, res) {
    // list all posts via SQL query
    db.query("SELECT * FROM posts INNER JOIN topics ON posts.topicName = topics.topicName", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("index/index.ejs", data);
        }
    })
});

app.get("/topic/:topicname/:postid", function(req, res) {
    db.query("SELECT * FROM posts WHERE postId = " + req.params.postid, (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("profiles/post.ejs", data);
        }
    })
});

app.get("/newpost", function(req, res) {
    res.render("newpost.ejs", data);
});

app.post("/postsubmitted", function(req, res) {
    let sqlquery = "INSERT INTO posts (userId, topicId, postName, postBody, postCreationDate)VALUES(" +
        1 + ", " +
        1 + ", " +
        "'" + req.body.posttitle + "', " +
        "'" + req.body.postbody + "', " +
        "NOW()" +
    ")";

    db.query(sqlquery, (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
        }
    });
});

app.post("/searchresult/:table", function(req, res) {
    db.query("SELECT * FROM " + req.params.table + "s" + " WHERE " + req.params.table + " name LIKE '%" + req.body.search + "%'", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("searchresult.ejs", data);
        }
    })
});

app.listen(port); // start site