const winston = require('winston');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const http = require('http');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const socketIO = require('socket.io');

const secret = require('./src/server/config/credential/keys');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Database
require('./src/server/config/db')(mongoose);

// Server log
if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV);
  console.log(process.env.MONGO_URI);
  console.log(process.env.JWT_PRIVATE_KEY);
  console.log(process.env.SECRET_OR_KEY);
  console.log(process.env.CLOUDINARY_CLOUD_NAME);
  console.log(process.env.CLOUDINARY_API_KEY);
  console.log(process.env.CLOUDINARY_API_SECRET);
}

// general config
app.set('views', path.join(__dirname, 'src/client/views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
app.use(flash());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    secret: secret.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
// Morgan logger middleware
app.use(morgan('tiny'));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set static folder
app.use(express.static('src/client/public'));

require('./src/server/config/logging')();
require('./src/server/config/validation')();
require('./src/server/config/routes')(app);

// Passport middleware
// app.use(passport.initialize());
// Passport Config
// require('./src/server/config/passport')(passport);

const port = process.env.PORT || 5000;
const ChatServer = server.listen(port, () =>
  winston.info(` 💻 Chat Server started on port ${port} 🌎 `)
);

module.exports = ChatServer;
