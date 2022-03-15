const db = require('../config/connection');
const { Thought, User } = require('../models');
// import function to seed data
const thoughtSeeds = require('./thoughtsSeed.json');
const userSeeds = require('./userSeed.json');

db.once('open', async () => {
    // Drop existing Thought and user charts
    await Thought.deleteMany({});
    await User.deleteMany({});

    // const thoughts = await Thought.create(thoughtSeeds);
    const users = await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
        const { _id, username } = await Thought.create(thoughtSeeds[i]);
        const user = await User.findOneAndUpdate(
          { username: username },
          {
            $addToSet: {
                thoughts: _id,
            },
          }
        );
      }

    console.log('all done! Seeding complete! 🌱');
    process.exit(0);
});