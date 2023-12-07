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
- [ ] Post & user search functionality
    - There probably won't be enough topics to warrant a search function for it.
- [ ] Register
- [ ] Login/logout
- [ ] Ability to delete posts
- [ ] Admin perms
- [ ] Comments/replies
- [ ] Styling/front-end design
    - [ ] Colour scheme
- [ ] Post tagging