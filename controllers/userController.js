const { Thought, User } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res){
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    // GET single user by _id
    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'No user with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // POST new user // create a new user
    createUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // PUT update a user by _id
    updateUser(req, res){
        User.findOneAndUpdate({ _id: req.params.userId }, 
            { $set: req.body }, { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'No user with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE remove by its _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },

    // /api/users/:userId/friends/:friendId
    // POST to add a new friend to userlist
    addNewFriend(req, res){
        User.findOneAndUpdate({ _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'No user with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete to remove a friend to user list
    deleteAFriend(req, res) {
        User.findOneAndDelete({ _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
};