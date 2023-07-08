const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/users'; // Replace with your MongoDB connection URL
// Replace with your MongoDB connection URL and database name

const db =mongoose.connect(url)
.then(() => {
  console.log('Connected to MongoDB successfully!');
  // Define and use schemas and models here
})
.catch((error) => {
  console.error('Failed to connect to the database:', error);
})
module.exports = db;
