const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
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

module.exports = router;