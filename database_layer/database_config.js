const dotenv = require('dotenv');
dotenv.config();

// MongoDB
MONGO_DB = process.env.MONGO_DB;

module.exports = {
  mongodb_url: MONGO_DB,
};
