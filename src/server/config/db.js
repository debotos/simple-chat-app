const winston = require('winston');
const mongoURI = require('./credential/keys').mongoURI;

module.exports = function(mongoose) {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => winston.info(`👨‍ Connected to ${mongoURI} ✔ `));
};
