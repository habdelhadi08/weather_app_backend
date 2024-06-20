import express from 'express';
import User from '../modules/Users.js';

const router = new express.Router();

/**
 * POST /auth/signup
 * register a new user
 */
// router.post('/signup', async (req, res) => {

// });


/**
 * POST /auth/signin
 * Authenticate an existing user
 */
// router.post('/login', async (req, res) => {

// });

/**
 * POST /auth/signup
 * register a new user
 */
router.post('/signup', async (req, res) => {
    try {
        const emailInUse = await User.findOne({email: req.body.email});

        if (emailInUse) {
            return res.send('Email in use!');
        }

        const user = await User.create(req.body);
        res.send(user);
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /auth/signin
 * Authenticate an existing user
 */
router.post('/login', async (req, res) => {
    try {
        const dbUser = await User.findOne({username: req.body.username});
        
        // existing user with username
        if (!dbUser) {
            return res.send('Check your username!');
        }

        
        // password match
        if (dbUser.password !== req.body.password) {
            return res.send('Check your password!');
        }

        // send all the user data
        res.send(dbUser);

    } catch (error) {
     console.log(error);   
    }
});

export default router;