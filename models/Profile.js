const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    Title: {
        type: String
    },
    Released: {
        type: String
    },
    Runtime: {
        type: String
    },
    Rated: {
        type: String
    },
    Director: {
        type: String
    },
    Plot: {
        type: String
    },
    Poster: {
        type: String
    },
    Ratings: {
        type: Array
    },
    Metascore: {
        type: Number
    },
    Production: {
        type: String
    },
    Watched: {
        type: Boolean
    },
    Review: {
        type: String
    },
    Score : {
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