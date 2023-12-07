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
    database: "forum"
})

let data = { // data for each site to have access to
    siteName: "Alforum",
}

app.set("views", __dirname + "/views");          // set the views directory for express to pick up files from
app.set("view engine", "ejs");                   // set EJS as our views engine
app.engine("html", ejs.renderFile);              // tell express to use EJS to render HTML files
app.use(express.static(__dirname + "/public"));  // tell express to use the `public/` folder for files to serve to the client (such as css)
app.use(bodyParser.urlencoded({extended: true})) // use bodyParser for access to req.body

// express routing
app.get("/", function(req, res) {
    res.render("index.ejs", data);
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
            data = Object.assign({}, data, {result:result}); // append query result to data
            res.render("user.ejs", data);
        }
    })
});

// ------------------------------------------------------ topics
app.get("/topics", function(req, res) {
    // list all topics via SQL query
    db.query("SELECT * FROM topics", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("topics.ejs", data);
        }
    });
});

app.get("/topic/:topicname", function(req, res) {
    // select specific topic from URL
    db.query("SELECT * FROM topics WHERE name LIKE '" + req.params.topicname + "'", (err, topicdata) => {
        if (err) {
            console.error(err.message);
        } else {
            db.query("SELECT * FROM posts WHERE topicId = " + topicdata[0].topicId, (err, postdata) => {
                if (err) {
                    console.error(err.message);
                } else {
                    data = Object.assign({}, data, {topicdata:topicdata[0]}, {postdata:postdata}); // append query result to data
                    res.render("topic.ejs", data);
                }
            })
        }
    })
});

// -------------------------------------------------------- posts
app.get("/posts", function(req, res) {
    // list all posts via SQL query
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
            res.render("posts.ejs", data);
        }
    })
});

app.get("/post/:postid", function(req, res) {
    // list all posts via SQL query
    db.query("SELECT * FROM posts WHERE postId = " + req.params.postid, (err, result) => {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result})
            res.render("post.ejs", data);
        }
    })
});

app.get("/newpost", function(req, res) {
    res.render("newpost.ejs", data);
});

app.post("/postsubmitted", function(req, res) {
    console.log(req.body);
    let sqlquery = "INSERT INTO posts (userId, topicId, name, body, creationDate)VALUES(" +
        1 + ", " +
        1 + ", " +
        "'" + req.body.posttitle + "', " +
        "'" + req.body.postbody + "', " +
        "NOW()" +
    ")";

    console.log(sqlquery);

    db.query(sqlquery, function(err, result) {
        if (err) {
            console.error(err.message);
        } else {
            data = Object.assign({}, data, {result:result});
        }
    });
});

app.post("/search", function(req, res) {
    console.log(req);
});

app.listen(port); // start site