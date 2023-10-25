const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = process.env.PORT || 3000;

module.exports = {
  JWT_SECRET,
  MONGO_URL,
  PORT,
};
