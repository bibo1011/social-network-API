const { Schema, model, Types} = require ('mongoose');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Body is Required',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
            // Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: 'Username is required'
        }, //(The user that created this thought)
        reactions: [ReactionSchema]

    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
