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
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    createThought(req, res){
        Thought.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thoughts._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                ? res.status(404).json({message: 'Application created, but found no user with that ID',})
                : res.json('Created the application 🎉')
            )
            .catch((err) => res.status(500).json(err));
    },
    // PUT to update a thought by its `_id`
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $set: req.body }, { new: true })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({message: 'No thought with that ID'})
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a thought by its `_id`
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                ? res.status(404).json({message: 'No user with this id!',})
                : res.json({ message: 'Application successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // **`/api/thoughts/:thoughtId/reactions`**
    // POST to create a reaction stored in a single thought's `reactions` array field
    createReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: {reactions: req.body}},
            {new: true}
        )
        .then((thoughts) =>
            !thoughts
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to pull and remove a reaction by the reaction's `reactionId` value
    removeReaction(req, res){
        Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { tags: { responseId: req.params.reactionId } } },
                // { $pull: { reactions: { _id: req.body } } },
                { new: true }
            )
            .then((thoughts) =>
              !thoughts
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
};