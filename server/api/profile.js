const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Profile = require('../models/Profile')

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}) //Profile schema has user field referring to ObjectID
        .populate('user', ['name']) // add fields from User schema

        if(!profile) { return res.status(400).json({msg: 'There is no user profile'})}
        
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   POST api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name'])
        //User id is valid Object ID e.g. 3514bvg124f
        if(!profile) return res.status(400).json({ msg: 'Profile not found'})
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            // user_ID is not an Object ID e.g. 1
            return res.status(400).json({ msg: 'Profile not found'})
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/profile/
// @desc    Delete profile & user
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {

        // Remove profile
        await Profile.findOneAndRemove({user: req.user.id})
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id})
        res.json({msg: 'User deleted'})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/profile/addmovie
// @desc    Add movies to user's profile
// @access  Private
router.put('/addmovie', auth, async (req, res) => {

    const { title, poster, year } = req.body.movie
    const movie = { title, poster, year }
    try {
        //find user profile
        const profile = await Profile.findOne({user: req.user.id})
        console.log(profile.movies);
        
        profile.movies.push(movie)
        await profile.save();
        console.log(profile.movies);

        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/profile/movies/:movieID
// @desc    Update movie from user's profile
// @access  Private
router.put('/updatemovie/:movieID', auth, async(req, res) => {
    const {
        score,
        review
    } = req.body.updates

    try {

        const profile = await Profile.findOne({user: req.user.id})
        console.log("profile.movies", profile);
        const updateIndex = profile.movies.map(item => item.id).indexOf(req.params.movieID)
        profile.movies[updateIndex]["score"] = score 
        profile.movies[updateIndex]["review"] = review 
        
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        
    }
})

// @route   DELETE api/profile/movies/::movieID
// @desc    Delete movie from user's profile
// @access  Private
router.delete('/:movieID', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})

        // Get remove index by mapping movies' ids, then find indexOf desired movieID
        const removeIndex = profile.movies.map(item => item.id).indexOf(req.params.movieID)
        
        profile.movies.splice(removeIndex, 1); //removeIndex found
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message); 
    }
})
module.exports = router;