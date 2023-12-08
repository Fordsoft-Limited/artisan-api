export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    mongoConection: process.env.MONGO_CONNECTION,
    mailUsername: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
    mailHost: process.env.MAIL_HOST,
    mongoArtisanConnection: process.env.MONGO_CONNECTION_ARTISAN || 'mongodb+srv://artisan:rTgLTgNVduSUnFby@artisancluster.id61jpj.mongodb.net/artisan_store?retryWrites=true&w=majority',
    jwtSecret: process.env.JWT_SECRET,
    appSalt: process.env.APP_SALT||10
  });
  // console.log(process.env.MONGO_CONNECTION_ARTISAN)
  