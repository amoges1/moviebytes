const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check')
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
], (req, res) => {
    const errors = validationResult(req) //compare from above
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        }) // bad request
    }
    console.log(req.body.name);
    res.send(req.body.name)
})

module.exports = router;