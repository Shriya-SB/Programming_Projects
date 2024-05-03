const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_KEY = "NavneetIsAGoodDeveloper@@@$$$000"
const Contact = require('../models/Contact')
const fetchuser = require('../middleware/fetchuser')

router.post('/createuser', [
    body("name", 'Enter a valid name!!').isLength({ min: 2 }),
    body("email", 'Enter a valid email!!').isEmail(),
    body("password", 'Password must be five characters!!').isLength({ min: 5 }),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ success: false, error: 'Sorry, the user with this email already exists!!' })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)
        user = await User.create({
            name: name,
            email: email,
            password: secPass,
            date: Date.now()
        })
        const data = {
            user: {
                id: user._id
            }
        }
        const authtoken = jwt.sign(data, JWT_KEY)
        user.tokens = user.tokens.concat({ token: authtoken });
        await user.save();
        return res.status(201).json({ success: true, message: 'User created successfully!!', authtoken, user })
    } catch (error) {
        return res.status(500).send("Internal Server Error", error)
    }
})

router.post("/login", [
    body("email", 'Enter a valid email!!').isEmail(),
    body('password', 'Password cannot be blank!!').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: 'Please enter valid credentials at valid place!!' })
    }
    const { password, email } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success: false, error: 'Please enter valid credentials at valid place!!' })
        }
        let passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Please enter valid credentials at valid place!!" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_KEY)
        return res.status(201).json({ success: true, message: 'User logged in successfully!!', authtoken, user })
    } catch (error) {
        return res.status(500).send("Internal Server error!!")
    }
})

router.post("/contact", fetchuser, [
    body("name").isLength({ min: 2 }),
    body("email").isEmail(),
    body('phone').isLength({ min: 9 }),
    body('desc').isLength({ min: 2 })
], async(req, res) => {
    // Make sure everything is coming from req
    const errors = validationResult(req)
        // Make sure no field is empty
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array() })
    }
    const { email, name, desc, phone } = req.body;
    try {
        const credentials = new Contact({
            name: name,
            email: email,
            desc: desc,
            phone: phone
        })
        const response = await credentials.save()
        return res.status(200).json({ success: true, message: 'Data sent successfully!!', credentials, response })
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Cannot send the data!!' })
    }
})
module.exports = router