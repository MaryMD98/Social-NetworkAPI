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
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called `reactionCount` that retrieves 
// the length of the thought's `reactions` array field on query.
ThoughtSchema
  .virtual('reactionCount')
  .get(function () {
      return `${this.reactions.length}`;
  });

  // Initialized the thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
