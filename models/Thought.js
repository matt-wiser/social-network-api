const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 255
        },
        username: {
            type: String,
            required: true,
            minLength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => moment(date).format('MM-DD-YYYY')
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
        },
        username: {
            type: String,
            required: true,
            minLength: 1
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            minLength: 1
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;