const { User, Thought } = require("../models/");

const userController = {
    //Create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //Get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "thoughts friends",
                select: '-__v'
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //Find single user
    findUserById({ params }, res) {
        User.findOne({_id: params.id})
            .populate({
                path: "thoughts friends",
                select: '-__v'
            })
            .select('-__v')
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
    //Update a single user
    updateUser({body, params}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
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
    // Delete a single user
    deleteUser({ params }, res) {
        User.findById(params.id)
        .then(userData => {
            return Thought.deleteMany({_id:{$in:userData.thoughts}})
        })
        .then(deletedThoughts =>{
            return User.findOneAndDelete({_id: params.id});
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
    //Add a friend to a user
    //$addToSet insures no duplicates
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$addToSet: {friends: params.friendId}},
            {new: true}
        )
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
    //Delete a friend from a user
    deleteFriend({ params, body }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: "No user matching that id!"});
                return;
            } else {
                res.json(userData);
            }
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;