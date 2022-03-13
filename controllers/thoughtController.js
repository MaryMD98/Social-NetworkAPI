const { Thought, User } = require('../models');

module.exports = {
    // GET to get all thoughts
    getThoughts(req, res){
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET to get a single thought by its `_id`
    getSingleUser(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thoughts) => 
                !thoughts
                    ? res.status(404).json({message: 'No thought with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    createThought(req, res){},
    // PUT to update a thought by its `_id`
    updateThought(req, res){},
    // DELETE to remove a thought by its `_id`
    deleteThought(req, res){},
    // **`/api/thoughts/:thoughtId/reactions`**
    // POST to create a reaction stored in a single thought's `reactions` array field
    createReaction(req, res){},
    // DELETE to pull and remove a reaction by the reaction's `reactionId` value
    removeReaction(req, res){},
};