const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");

const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
        throughtText: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (createdAt) {
                return new Date(createdAt).toLocaleString();
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;