const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
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

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // connect to UserSchema's ObjectID
        ref: 'user' //reference to User model
    },
    location: {
        type: String
    },
    movies: [MovieSchema],
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
        type: Date,
        default: Date.now
    }
})



module.exports = Profile = mongoose.model('profile', ProfileSchema)