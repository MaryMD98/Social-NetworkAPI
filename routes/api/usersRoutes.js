const router = require('express').Router();
const {getUsers, getSingleUser,
       createUser, updateUser, 
       deleteUser, addNewFriend, 
       deleteAFriend} = require('../../controllers/userController');
// /api/users
// GET all users // POST new user
router.route('/').get(getUsers).post(createUser);

// GET single user by _id
// PUT update a user by _id
// DELETE remove by its _id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
// POST to add a new friend to userlist
// Delete to remove a friend to user list
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteAFriend);

module.exports = router;
