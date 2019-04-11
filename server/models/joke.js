const mongoose = require('mongoose')
const { Schema } = mongoose

const jokeSchema = new Schema({
    joke: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;