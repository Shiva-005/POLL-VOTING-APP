const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        trim:true,
    },
    options:[
        {
            optionName: {
                type: String,
                required: true,
                trim: true,
            },
            count:{
                type:Number,
                default:0
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const POLL = mongoose.model("poll",pollSchema);
module.exports=POLL;