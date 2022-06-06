const envImports = require('../constants/env-imports');
const username = envImports.INSTA_USERNAME;
const password = envImports.INSTA_PASSWORD;

// === INSTAGRAM NPM === //
const Instagram = require('instagram-web-api');
const instaClient = new Instagram({ username, password });

module.exports = instaClient;