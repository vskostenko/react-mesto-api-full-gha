const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateSignin, validateSignup } = require('../middlewares/requestvalidator');
const NotFoundError = require('../errors/not_found');

router.use('/signup', validateSignup(), createUser);
router.use('/signin', validateSignin(), login);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

module.exports = router;
