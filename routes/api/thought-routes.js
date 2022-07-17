const router = require("express").Router();
const {
    getThoughts, 
    getSingleThought, 
    addThought, 
    updateThought,
    addReaction, 
    deleteThought, 
    removeReaction
} = require('../../controllers/thought-controller');

//Thought Routes
router.route("/").get(getThoughts);
router.route("/:userId").post(addThought);
router.route("/:thoughtId").get(getSingleThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").delete(deleteThought);


// Reaction Routes
router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions").delete(removeReaction);

module.exports = router;