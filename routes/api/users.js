const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const {
    check,
    validationResult
} = require('express-validator')

const User = require('../../models/User')
// @route   POST api/users
// @desc    User registration
// @access  Public
router.post('/', [
    //based on express validator check doc
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req) //compare from above
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        }) // bad request
    }

    const {
        name,
        email,
        password
    } = req.body

    try {

        // Find user
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{msg: 'User already exists' }]})
        }

        //create User
        user = new User({
            name, email, password
        })

        const salt = await bcrypt.genSalt(10); //recommended 10, higher better; used for hashing
        user.password = await bcrypt.hash(password, salt); 

        await user.save() //use await instead of promise.then

        res.send('User registered')

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
})

module.exports = router;