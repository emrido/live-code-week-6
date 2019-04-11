const Joke = require('../models/joke');

class JokeController {
    static myFavorites(req, res) {
        Joke
            .find({
                owner: req.authenticatedUser._id
            })
            .then(jokes => {
                res.status(200).json(jokes)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }

    static add(req, res) {
        Joke
            .create({
                joke: req.body.joke,
                owner: req.authenticatedUser._id
            })
            .then(newJoke => {
                res.status(201).json({
                    _id: newJoke._id,
                    joke: newJoke.joke
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }

    static remove(req, res) {
        Joke
            .deleteOne({
                _id: req.params.id
            })
            .then(result => {
                if (result.n && result.ok) {
                    res.status(200).json({
                        message: 'Joke removed from your favorites'
                    });
                } else {
                    res.status(404).json({
                        message: 'Joke not fuound'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
}

module.exports = JokeController;