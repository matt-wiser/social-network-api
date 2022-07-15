const { User } = require("../models/");

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
                path: "thoughts",
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
                path: "thoughts",
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
        User.findOneAndDelete({_id: params.id})
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
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: body}},
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
            {$pull: {friends: {friendId: params.friendId}}},
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