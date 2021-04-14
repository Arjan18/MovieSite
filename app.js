const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');

//Chat App Stuff
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'ChatRoom Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
  const user = userJoin(socket.id, username, room);

  socket.join(user.room);

  // Welcome current user
  socket.emit('message', formatMessage(botName, 'Welcome to ChatRoom'));

  //Shows when a user connects - Broadcast.emit shows message to everyone apart from user themselves
  socket.broadcast
  .to(user.room)
  .emit('message', formatMessage(botName, `${user.username} has joined the chat`)
  ); 

  //Send User and Room Info
  io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
  });
});

  //Listen for chatMessage
  socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
      
      io.to(user.room).emit('message', formatMessage(user.username, msg));
  });  
  
  //Run when client disconnects 
  socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if(user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

  //Send User and Room Info
      io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
          });
      }
  });
});


//Datbase Connection
const db = require('./config/db').MongoURI

// Passport Config
require('./config/passport')(passport);

//Mongo Connection
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//BodyParser
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

app.use(fileUpload());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Flash Connect
app.use(flash());

// Global variables to display messages
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/films', require('./routes/films'));
app.use('/shows', require('./routes/shows'));

//TO ACCESS HTML FILES
app.use(express.static(__dirname));

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));