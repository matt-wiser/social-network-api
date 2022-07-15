const router = require("express").Router();
const {getThoughts, addThought, addReaction, removeThought, removeReaction} = require('../controllers/thought-controller');

router.route("/").get(getThoughts);
router.route("/:userId").post(addThought);
router.route("/:userId/:thoughtId").put(addReaction);
router.route(":/userId/:thoughtId").delete(removeThought);
router.route(":/userId/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;