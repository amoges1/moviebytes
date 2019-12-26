const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // connect to UserSchema's ObjectID
        ref: 'user' //reference to User model
    },
    location: {
        type: String
    },
    movies: [movieSchema],
    friends: {
        type: Array
    },
    social: {
        twitter: {
            type:String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    date: {
        type: Date.now,
        default: Date.now
    }
})

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    released: {
        type: String,
        required: true
    },
    runtime: {
        type: String,
        required: true
    },
    rated: {
        type: String
    },
    director: {
        type: String
    },
    plot: {
        type: String
    },
    poster: {
        type: String
    },
    metascore: {
        type: Number
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)