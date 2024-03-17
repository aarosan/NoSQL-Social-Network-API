const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;