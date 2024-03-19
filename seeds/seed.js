const { User, Thought, Reaction } = require("../models");
const mongoose = require('mongoose');

const db = require("../config/connection");

const users = [
    {
        username: "Aaron",
        email: "test@gmail.com",
        thoughts: [],
    },
    {
        username: "Nic",
        email: "example@gmail.com",
        thoughts: [],
    }
]

db.once('open', async () => {
    console.log('Database connected for seeding');
    await User.deleteMany({});
    await User.insertMany(users);
    console.log(users);
    console.log('Seeding complete');
    process.exit(0);
});
