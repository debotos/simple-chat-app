module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  sessionSecret: process.env.SESSION_SECRET_KEY,
  cloudinaryConfig: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  facebookAuth: {
    clientID: process.env.FACEBOOK_CLIENT_ID, // App ID
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET, // App Sectet
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileURL:
      'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    profileFields: ['id', 'displayName', 'photos', 'email'] // Asking for this data
  },
  googleAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
};
