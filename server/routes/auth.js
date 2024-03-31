const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const { User } = require("../models/User");
const bcrypt = require('bcrypt');
const { fetchuser } = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "Whatthehe$ll"

router.get("/test", async (req, res) => {
    res.status(200).json({msg:"success"})
})



// ROUTE 1 : Create a User using : POST "/api/auth/createuser"
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are error return Bad request and errors
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // Check whether the user with same email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        console.log("CU-Data: ", data)

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log("CU-Auth Token:", authtoken)

        // res.json(user)
        success = true
        res.json({ success, })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
});

//ROUTE 2 : Authenticate a Users using POST "/api/auth/login". Doesn't require login

router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    // If there are error return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with email registered
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            let success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            let success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id,
                name: user.name
            }
        }
        console.log("LO-data: ", data);

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log("LO-Authdata: ", authtoken);

        let success = true
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
});

//ROUTE 3 : get Logged-in Users details using POST "/api/auth/getuser". Login Required
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error ")
    }
});


module.exports = router;
