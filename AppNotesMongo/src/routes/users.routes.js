const {Router}= require('express');
const router = Router();

const {
    renderSignupform,
    renderSiginform,
    signup,
    signin,
    logout
} = require('../controllers/user.controller');

router.get('/users/signup', renderSignupform);

router.post('/users/signup',signup);

router.get('/users/signin', renderSiginform);

router.post('/users/signin',signin);

router.get('/users/logout', logout);

module.exports = router;