const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    watched: {
        type: Boolean
    },
    review: {
        type: String
    },
    score : {
        type: Number
    }
    
})

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // connect to UserSchema's ObjectID
        ref: 'user' //reference to User model
    },
    movies: [MovieSchema],
    date: {
        type: Date,
        default: Date.now
    }
})



module.exports = Profile = mongoose.model('profile', ProfileSchema)