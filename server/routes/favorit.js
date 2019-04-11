const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/joke');
const { authorization } = require('../middlewares/authorization');

router.get('/', jokeController.myFavorites);
router.post('/', jokeController.add);
router.delete('/:id', authorization, jokeController.remove);

module.exports = router;