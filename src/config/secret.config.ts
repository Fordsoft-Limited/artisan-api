export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    mongoConection: process.env.MONGO_CONNECTION,
    mailUsername: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
    mailHost: process.env.MAIL_HOST,
    mongoArtisanConnection: process.env.MONGO_CONNECTION_ARTISAN,
    jwtSecret: process.env.JWT_SECRET,
    appSalt: process.env.APP_SALT||10
  });
  