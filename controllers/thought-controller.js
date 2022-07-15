const { User, Thought } = require("../models");

const thoughtController = {
    //Add a thought to a user
    addThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: "No user matching that id!"});
                return;
            } else {
                res.json(userData);
            }
        })
        .catch(err => res.status(400).json(err));
    },
    //Add a reaction to a thought
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: "No thought matching that id!"});
                return;
            } else {
                res.json(userData);
            }
        })
        .catch(err => res.status(400).json(err));
    },
    //Remove a thought by id and remove a thought from its associated user by user id
    removeThought({params, body}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({message: "No thought matching that id!"});
            }

            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            );   
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: "No thought matching that id!"});
                return;
            } else {
                res.json(userData);
            }
        })
        .catch(err => res.status(400).json(err));
    },
    //Remove a reaction from a thought
    removeReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}}
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: "No thought matching that id!"});
                return;
            } else {
                res.json(userData);
            }
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;