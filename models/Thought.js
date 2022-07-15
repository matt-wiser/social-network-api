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
            get: date => moment(date).format('DD-MM-YYYY')
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

ThoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;