const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const dbclient = require("../db")
const auth = require("../middleware/auth")
const { check, validationResult } = require('express-validator')

// @route   POST api/register
// @desc    Create User & Get Token
// @access  Public
router.post('/register', [
    //based on express validator check doc
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (req, res) => {
    //confirm errors
    const errors = validationResult(req) 
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        }) 
    }

    try {

        // Find user
        const user = await dbclient.db("moviebytes").collection("users").findOne({email: req.body.email})
        if (user) {
            return res.status(400).json({ errors: [{msg: 'User already exists' }]})
        }

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const salt = await bcrypt.genSalt(10); //recommended 10, higher better; used for hashing
        newUser.password = await bcrypt.hash(newUser.password, salt); 
        const insertedUser = await dbclient.db("moviebytes").collection("users").insertOne(newUser)

        // create profile fo ruser
        const user_id = insertedUser.ops[0]._id
        await dbclient.db("moviebytes").collection("profiles").insertOne({user_id: user_id, email: newUser.email, movies: []})

        const payload = { 
            user: { 
                id: user_id,
                email: newUser.email 
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000 }, (err, token) => { // 3600 = 1 hour, optional
            if(err) throw err;
            res.json({token})
        }) 
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
})

// @route   POST api/login
// @desc    Authenticate User & Get Token
// @access  Public
router.post('/login', [
    //based on express validator check doc
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req) 
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        }) // bad request
    }

    try {
        // Find user
        const user = await dbclient.db("moviebytes").collection("users").findOne({ Eemail: req.body.email });
        
        if (!user) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials' }]})
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials' }]})
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email           
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000 }, (err, token) => { // 3600 = 1 hour, optional
            if(err) throw err;
            res.json({token})
        }) 
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
})

// @route   DELETE api/deactivate
// @desc    Delete User and Profile
// @access  Private
router.delete("/deactivate", auth, async (req, res) => {
    try {
        await dbclient.db("moviebytes").collection("profiles").deleteOne({email: req.user.email})
        await dbclient.db("moviebytes").collection("users").deleteOne({email: req.user.email})
        res.status(200).json("User deleted")
    } catch (err) {
        console.log(err.message);
    }
})
module.exports = router;