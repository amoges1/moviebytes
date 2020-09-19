const express = require('express');
const router = express.Router();
const auth = require('./auth')
const dbclient = require("../db")

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        const profile = await dbclient.db("moviebytes").collection("profiles").findOne({email: req.user.email})
        if(!profile) { return res.status(400).json({msg: 'There is no user profile'})}
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/profile/movies/add
// @desc    Add movies to user's profile
// @access  Private
router.put('/movies/add', auth, async (req, res) => {
    try {
        //add movie
        const profile = await dbclient.db("moviebytes").collection("profiles").updateOne({email: req.user.email},{ $addToSet: {movies: req.body.movie }})
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/profile/movies/update
// @desc    Update user's movie review from profile
// @access  Private
router.put('/movies/update', auth, async(req, res) => {
    const { title, score, review, year } = req.body.updates
    try {
        const profile = await dbclient.db("moviebytes").collection("profiles").findOne({email: req.user.email})
        const movie = profile.movies.filter(movie => movie.title == title && movie.year == year)
        if(movie.length == 0) return res.status(400).json({msg: "Movie not found"})

        await dbclient.db("moviebytes").collection("profiles").updateOne({email: req.user.email}, {
            $set: {
                "movies.$[movie].score": score,
                "movies.$[movie].review":  review
            }}, {
                multi:true, arrayFilters: [{"movie.title":title}]
            })
        res.json("Success")
    } catch (err) {
        console.error(err.message);
    }
})

// @route   DELETE api/profile/movies/delete
// @desc    Delete movie from user's profile
// @access  Private
router.delete('/movies/delete', auth, async(req, res) => {
    try {
        const { title, year} = req.body.movie

        const profile = await dbclient.db("moviebytes").collection("profiles").findOne({email: req.user.email})
        const movie = profile.movies.filter(movie => movie.title == title && movie.year == year)
        if(movie.length == 0) return res.status(400).json({msg: "Movie not found"})

        //Removing element sets value = null
        await dbclient.db("moviebytes").collection("profiles").updateOne({email: req.user.email}, {
            $unset: {"movies.$[movie]": 1} }, {
                multi:true, arrayFilters: [{"movie.title":title}]
            })
        //Remove null value
        await dbclient.db("moviebytes").collection("profiles").updateOne({email: req.user.email}, {$pull: {movies:null}})
        res.json("Success")
    } catch (err) {
        console.error(err.message); 
    }
})

module.exports = router;