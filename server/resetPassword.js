const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hash = await bcrypt.hash('password123', 10);
  const result = await mongoose.connection.collection('users').updateOne(
    { email: 'naveen@hometeam.com' },
    { $set: { password: hash } }
  );
  console.log('Matched:', result.matchedCount, '| Modified:', result.modifiedCount);
  console.log('New hash:', hash);
  mongoose.disconnect();
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});