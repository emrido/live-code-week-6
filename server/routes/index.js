const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const favoriteRoute = require('./favorit');
const { authentication } = require('../middlewares/authentication');

router.use('/users', userRoute);
router.use('/favorites', authentication, favoriteRoute)

module.exports = router;