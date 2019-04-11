const Joke = require('../models/joke')

module.exports = {
    authorization: function(req, res, next) {
        Joke
            .findById(req.params.id)
            .then(article => {
                if (String(article.owner) !== req.authenticatedUser._id) {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                } else {
                    next()
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
}