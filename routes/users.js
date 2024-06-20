import express from 'express';
import User from '../modules/Users.js'
const router = new express.Router();

//get/users
//get all users

router.get('/', async (req, res) => {
    try {
     const users = await User.find();
     res.send(users);
    } catch (error) {
     console.log(error);
    }
 });

/**
 * POST /users/
 * Create a new user
 */
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.send(user);
        // res.json(user).status(203);

    } catch (error) {
        console.log(error);
    }
});
/**
 * GET /user/:id
 * Get user by id
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.send('User not found');
        }

        res.send(user);
    } catch (error) {
        console.log(error);
        res.send({error: 'Error, invalid data'});
    }
});

/**
 * DELETE /users/:idGR
 * Deletes an user
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        res.send({
            deletedUser: deletedUser,
            message: 'User deleted!'
        });
    } catch (error) {
        console.log(error);
        res.send({error: 'Error, invalid data'});
    }
});
/**
 * PUT /user/:id
 * Updates an user
 */
router.put('/:id', async (req, res) => {
    try {

        // const usernameTaken = await User.findOne({username: req.body.username});
        // console.log(usernameTaken);

        // if (usernameTaken) {
        //     return res.send('username not available!');
        // }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(updatedUser);
    } catch (error) {
        console.log(error);
        res.send({error: 'Error, invalid data'});
    }
});






export default router;