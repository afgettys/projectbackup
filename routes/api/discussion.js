const router = require("express").Router();
const discussionController = require("../../controllers/discussionController");

// Matches with "/api/discussion"
router.route("/")
  .get(discussionController.findAll)
  .post(discussionController.create);

// Matches with "/api/discussion/:id"
router
  .route("/:id")
  .get(discussionController.findById)
  .put(discussionController.update)
  .delete(discussionController.remove);

module.exports = router;
