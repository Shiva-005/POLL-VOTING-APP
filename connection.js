const moongoose = require("mongoose");

async function connectToMongoDB(url) {
    moongoose.connect(url);
}

module.exports={connectToMongoDB};