const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3005,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    `mongodb+srv://Simon:simon102006f@cluster0.uxkk6fx.mongodb.net/ProjectDB?retryWrites=true&w=majority` ||
    `mongodb://${process.env.IP || 'localhost'}:${process.env.MONGO_PORT || '27017'}/mernproject`
};

export default config;

