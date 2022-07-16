const { User, Thought } = require("../models");

const thoughtController = {
    //Get all thoughts
    getThoughts(req, res){
        Thought.find({})
            .populate({
                path: "reactions",
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get a single thought
    getSingleThought ({params}, res) {
        Thought.findById(params.thoughtId)
        .populate({
            path: "reactions",
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: "No thought matching that id!"});
            } else {
                res.json(thoughtData)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Update a single thought
    updateThought({params, body}, res) {
        Thought.findByIdAndUpdate(params.thoughtId, {thoughtText: body.thoughtText}, {new:true})
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: "No thought matching that id!"});
            } else {
                res.json(thoughtData)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //Add a thought to a user
    async addThought({params, body}, res) {
        User.findById(params.userId)
        .then(userData =>{
            return Thought.create({thoughtText: body.thoughtText, username: userData.username, userId: params.userId})
        })
        .then(thoughtData => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: thoughtData._id}},
                {new: true}
            )
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
    //Remove a thought by id and remove a thought from its associated user by user id
    deleteThought({params, body}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({message: "No thought matching that id!"});
            }

            return User.findOneAndUpdate(
                {_id: body.userId},
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
    //Remove a reaction from a thought
    removeReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: body.reactionId}}},
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
    }
}

module.exports = thoughtController;
