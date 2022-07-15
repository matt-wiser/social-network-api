const { Schema, model, Types } = require("mongoose");
const moment = require("moment");
const Thought = require("./Thought");

const FriendSchema = new Schema(
    {
        friendId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        friendName: {
            type: String,
            required: true,
            minlength: 1
        }
    }, 
    {
        _id: false
    }
);

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            minlength: 5
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address!']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => moment(date).format('MM-DD-YYYY')
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: Thought
            }
        ],
        friends: [FriendSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;