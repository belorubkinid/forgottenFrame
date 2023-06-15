/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = {
  store: new FileStore(),
  key: 'uid',
  secret: process.env.SECRET_KEY || 'secret',
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: {
    expires: 24 * 60 * 60e3,
  },
};

const indexRouter = require('./routers/index.router');
const authenticationRouter = require('./routers/authentication.router');
const gamesRouter = require('./routers/games.router');
const playersRouter = require('./routers/players.router');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN_URL,
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);
app.use('/games', gamesRouter);
app.use('/players', playersRouter);

app.listen(PORT, () => {
  console.log(`server has been started on port ${PORT}`);
});
