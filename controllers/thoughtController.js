const { User, Thought } = require('../models');

const thoughtController = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId});

            if(!thought) {
                return res.status(404).json({ message: "No thought found" });
            }

            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }      
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.bdoy},
                { runValidators: true, new: true }
            );

            if(!thought) {
                return res.status(404).json({ message: "No thought found" });
            }

            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            );

            if(!thought) {
                return res.status(404).json({ message: "No thought found" });
            }

            return res.status(200).json({ message: "Thought and associataed reactions succesfully deleted" });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            //reactions live in thoughts so you have to find the thought that you would like to attach the reaction to.
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true }
            );

            if(!reaction) {
                return res.status(404).json({ message: "No thought with this id" });
            }

            return res.statu(200).json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteReaction(rea, res) {
        try {
            const reaction = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if(!reaction) {
                return res.status(404).json({ message: "No thought with this id" });
            }
            
            return res.status(200).json({ message: "Reaction deleted successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;