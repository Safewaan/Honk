let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// User APIs
const createUser = require('./routes/user/createUser');
const userSearchByEmail = require('./routes/user/userSearchByEmail');
const activateUser = require('./routes/user/activateUser');
const archiveUser = require('./routes/user/archiveUser');

app.use(createUser);
app.use(userSearchByEmail);
app.use(activateUser);
app.use(archiveUser);

// Event APIs
const createEvent = require('./routes/events/createEvent');
const getEvents = require('./routes/events/getEvents');
const getEventsByUser = require ('./routes/events/getEventsByUser');
const joinEvent = require('./routes/events/joinEvent');
const editEvent = require('./routes/events/editEvent');
const cancelEvent = require('./routes/events/cancelEvent');
const getParticipants = require('./routes/events/getParticipants');

app.use(createEvent);
app.use(getEvents);
app.use(getEventsByUser);
app.use(joinEvent);
app.use(editEvent);
app.use(cancelEvent);
app.use(getParticipants);

//Profile APIs
const createUserProfile = require('./routes/profile/createUserProfile');
const getUserProfile = require('./routes/profile/getUserProfile');
const editUserProfile = require('./routes/profile/editUserProfile');

app.use(createUserProfile);
app.use(getUserProfile);
app.use(editUserProfile);

// Forum APIs
const createForum = require('./routes/forums/createForum');
const getForums = require('./routes/forums/getForums');
<<<<<<< HEAD
<<<<<<< HEAD
const getForumsByUser = require('./routes/forums/getForumsByUser'); 

app.use(createForum);
app.use(getForums);
app.use(getForumsByUser);
=======
const getSelectedForum = require('./routes/forums/getSelectedForum');
const addForumComment = require('./routes/forums/addForumComment');
const loadForumComments = require('./routes/forums/loadForumComments');
=======
const getForumsByForumID = require('./routes/forums/getForumsByForumID');
const createForumComment = require('./routes/forums/createForumComment');
const getForumCommentsByForumID = require('./routes/forums/getForumCommentsByForumID');
>>>>>>> d93144dd (Renamed)
const deleteForumComment = require('./routes/forums/deleteForumComment');

app.use(createForum);
app.use(getForums);
<<<<<<< HEAD
app.use(getSelectedForum);
<<<<<<< HEAD
>>>>>>> f56b537e (Open the forum in a new page)
=======
app.use(addForumComment);
app.use(loadForumComments);
<<<<<<< HEAD
>>>>>>> e7b87fbc (Comments)
=======
=======
app.use(getForumsByForumID);
app.use(createForumComment);
app.use(getForumCommentsByForumID);
>>>>>>> d93144dd (Renamed)
app.use(deleteForumComment);
>>>>>>> a4651970 (Delete feature)

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
