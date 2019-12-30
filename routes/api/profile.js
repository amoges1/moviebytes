const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

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

// @route   POST api/profile/
// @desc    Create/update user profile
// @access  Private
router.post('/', auth, async (req, res) => {
    // extract body submission
    const {
        location,
        movies,
        twitter,
        facebook,
        instagram,
        linkedin
    } = req.body

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(location) profileFields.location = location
    if(movies) profileFields.movies = movies

    // Build social object
    profileFields.social = {}
    if(twitter) profileFields.social.twitter = twitter
    if(facebook) profileFields.social.facebook = facebook
    if(instagram) profileFields.social.instagram = instagram
    if(linkedin) profileFields.social.linkedin = linkedin

    
    try {
        // Find Profile
        let profile = await Profile.findOne({ user: req.user.id })
        if(profile) {
            // Update w/ submitted information
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, {$set: profileFields}, { new: true})

            return res.json(profile)
        }

        // Create profile w/ submitted information
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   POST api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name'])
        res.json(profiles)
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
router.put('/movies', [auth, [
    check('Watched', 'Did you watch it?').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const {
        Title, Released, Runtime, Rated, Director, Plot, Poster,
        Ratings, Metascore, Production, Watched, Review, Score
    } = req.body
    
    const movie = {
        Title,
        Released,
        Runtime,
        Rated,
        Director,
        Plot,
        Poster,
        Ratings,
        Metascore,
        Production,
        Watched,
        Review,
        Score
    }

    try {
        //find user profile
        const profile = await Profile.findOne({user: req.user.id})
        profile.movies.unshift(movie)
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/profile/movies/:mov_id
// @desc    Update movie from user's profile
// @access  Private
router.put('/movies/:mov_id', [ auth, [
    check('Watched', 'Did you watch it?').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {
        Watched,
        Review,
        Score
    } = req.body

    try {
        const profile = await Profile.findOne({user: req.user.id})
        
        const updateIndex = profile.movies.map(item => item.id).indexOf(req.params.mov_id)
        profile.movies[updateIndex]["Watched"] = Watched 
        profile.movies[updateIndex]["Review"] = Review 
        profile.movies[updateIndex]["Score"] = Score 
        
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        
    }
})

// @route   DELETE api/profile/movies/:mov_id
// @desc    Delete movie from user's profile
// @access  Private
router.delete('/movies/:mov_id', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id})

        // Get remove index by mapping movies' ids, then find indexOf desired mov_id
        const removeIndex = profile.movies.map(item => item.id).indexOf(req.params.mov_id)
        
        profile.movies.splice(removeIndex, 1); //removeIndex found
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        
    }
})
module.exports = router;