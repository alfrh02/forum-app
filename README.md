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

If you're running MariaDB instead of MySQL, run `create_db_arch.sql` instead.

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
    - [x] Check for topic membership
- [x] FIX : change membership columns to utilise user & topic names instead of IDs
    - [x] Make user & topic names their primary keys?
- [x] Put topic name in post URL
- [x] User search functionality
- [x] Post search functionality
- [x] Topic search functionality
- [x] Registering
- [x] Create topic page
- [ ] Add a 'Join Topic' button
- [ ] Login/logout
- [ ] Ability to delete posts
- [ ] Admin perms
- [ ] Comments/replies
- [ ] Styling/front-end design
    - [ ] Colour scheme
- [ ] User/topic profile pictures
- [ ] Render posts with markdown