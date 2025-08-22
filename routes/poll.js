const express = require("express");
const {handleCreatePoll,handleShowAllPolls,handleShowRequestedPoll,handleVotePolls}=require("../controllers/poll");

const router = express.Router();

router.post("/create",handleCreatePoll);

router.get("/",handleShowAllPolls);

router.get("/:id",handleShowRequestedPoll);

router.post("/:pollId/options/:optionId/vote",handleVotePolls);

module.exports = router;