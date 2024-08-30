export default {
  // mongoUrl: process.env.MONGO_URL || 'mongodb://user:passwd@localhost:27017/shopper-api',
  mongoUrl: process.env.MONGO_URL || 'mongodb://user:passwd@mongo:27017/shopper-api',
  port: process.env.PORT || 8080,
};
