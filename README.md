This project has been made using Node.js, Express.js, EJS, & MySQL.

To run this application locally, make sure you have MySQL, Node.js, and NPM installed.

### Setup

#### Dependencies

To install Node dependencies:

```
npm install express ejs mysql body-parser
```

#### Database Setup

The `sql/` folder contains files that can be ran to create the database & insert dummy data. Make sure you have generated the database before running the server. If there is nothing in the database, the websites may show up blank.

#### Start Server

Start the server by running `node index.js`.

---

### Logic

Users, topics, and posts each have a userId, topicId, and postId respectively. These are integers with automatic incrementation.

Users & topics are only identified internally via their IDs. As topic & user names are unique, they are used in URLs for increased readability to the end user.

Posts are identified internally and externally through their IDs, meaning that their IDs are used for the URL, as post titles are not supposed to be unique.

---

### TODO

- [x] Topic index page
- [x] User index page
- [x] User profile page
- [x] Post index page
- [x] Set up SQL database & scripts
- [x] Post submission page
    - [ ] Check for topic membership
- [ ] FIX : change membership columns to utilise user & topic names instead of IDs
    - [ ] Make user & topic names their primary keys? 
- [ ] Put topic name in post URL
- [x] User search functionality
- [x] Post search functionality
    - There probably won't be enough topics to warrant a search function for it.
- [ ] Register
- [ ] Login/logout
- [ ] Ability to delete posts
- [ ] Admin perms
- [ ] Comments/replies
- [ ] Styling/front-end design
    - [ ] Colour scheme
- [ ] Post tagging