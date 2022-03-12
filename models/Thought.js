const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createAt:{
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    username:{
        type: String,
        required: true,
    },
    reactions:[
        {
            type: Schema.Types.ObjectId,
            ref: 'reaction',
        },
    ],
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

// **Schema Settings**:
// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
