const db = require('../config/connection');
const { Thought, User } = require('../models');
// import function to seed data
const thoughtSeeds = require('./thoughtsSeed.json');
const userSeeds = require('./userSeed.json');

db.once('open', async () => {
    // Drop existing Thought and user charts
    await Thought.deleteMany({});
    await User.deleteMany({});

    const thoughts = await Thought.create(thoughtSeeds);
    const users = await User.create(userSeeds);

    console.table(thoughts);
    console.table(users);
    console.log('all done! Seeding complete! 🌱');
    process.exit(0);
});