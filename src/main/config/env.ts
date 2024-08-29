export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/shopper-api',
  port: process.env.PORT || 8080,
};
