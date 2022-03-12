const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        required: true,
        maxlength: 280,
    },
    username:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        // * Use a getter method to format the timestamp on query
    },
});


// **Schema Settings**:

// This will not be a model, but rather will be used 
//as the `reaction` field's subdocument schema 
//in the `Thought` model.
