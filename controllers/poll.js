const POLL = require("../models/poll");

async function handleCreatePoll(req, res) {
    const question = req.body.question;
    const options = req.body.options;  // array of strings

    try {
        if (!question) {
            return res.json(`Please fill the question`);
        } else if (!options || options.length < 2) {
            return res.json(`Please enter at least 2 options`);
        } else {
            const formattedOptions = options.map(opt => ({
                optionName: opt,
                count: 0
            }));

            await POLL.create({
                question: question,
                options: formattedOptions,
            });

            return res.json(`Data is inserted in DataBase`);
        }
    } catch (error) {
        console.error("Error creating poll:", error);
        return res.json("Error found");
    }
}


async function handleShowAllPolls(req, res) {
    try {
        const allPolls = await POLL.find({});  // wait for DB response


        return res.render("home",{allPolls});  // send actual documents as JSON
    } catch (error) {
        console.error("Error fetching polls:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleShowRequestedPoll(req, res) {
    const pollId = req.params.id;

    try {
        const requestedPoll = await POLL.findById(pollId);

        if (!requestedPoll) {
            return res.status(404).json({ error: "Poll not found" });
        }

        return res.json(requestedPoll);  // send actual document as JSON
    } catch (error) {
        console.error("Error fetching poll:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleVotePolls(req,res) {
    const { pollId, optionId } = req.params;

    try {
        // Find poll by ID
        const poll = await POLL.findById(pollId);
        if (!poll) {
            return res.status(404).json({ error: "Poll not found" });
        }

        // Find option inside poll
        const option = poll.options.id(optionId);
        if (!option) {
            return res.status(404).json({ error: "Option not found" });
        }

        // Increment vote count
        option.count += 1;
        await poll.save();

        return res.json({ message: "Vote recorded", poll });
    } catch (error) {
        console.error("Error while voting:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = {handleCreatePoll,handleShowAllPolls,handleShowRequestedPoll,handleVotePolls};