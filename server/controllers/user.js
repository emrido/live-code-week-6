const User = require('../models/user');
const { generateToken } = require('../helpers/jwt');
const { decrypt } = require('../helpers/bcrypt')

class UserController {
    static register(req, res) {
        User
            .create(req.body)
            .then(newUser => {
                res.status(201).json({
                    message: 'Register success'
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }

    static login(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    if (decrypt(req.body.password, user.password)) {
                        const token = generateToken(user._id, user.email)
    
                        res.status(200).json({
                            message: 'Login success',
                            token: token
                        })
                    } else {
                        res.status(401).json({
                            message: 'Wrong password'
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'User not found'
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

module.exports = UserController;