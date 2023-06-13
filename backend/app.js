const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/serverError');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
// автотесты не дают записать тут записать из env, на локальной машине работает

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://cozystyle.nomoredomains.monster',
      'https://cozystyle.nomoredomains.monster',
    ],
    credentials: true,
    maxAge: 60,
  }),
);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
