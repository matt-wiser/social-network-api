const router = require("express").Router();
const {createUser, getAllUsers, findUserById, updateUser, deleteUser, addFriend, deleteFriend} = require("../controllers/user-controller");

router.route('/')
.get(getAllUsers)
.post(createUser);

router.route("/:id")
.get(findUserById)
.put(updateUser)
.delete(deleteUser);

router.route("/:userId")
.post(addFriend);

router.route("/:userId:friendId")
.delete(deleteFriend);

module.exports = router;