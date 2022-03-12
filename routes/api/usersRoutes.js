const router = require('express').Router();
const {} = require('../../controllers/userController');
// /api/users
// GET all users
router.route('/').get();

// GET single user by _id
router.route('/:userId').get();
// POST new user
// PUT update a user by _id
// DELETE remove by its _id


// /api/users/:userId/friends/:friendId
// POST to add a new friend to userlist
// Delete to remove a friend to user list