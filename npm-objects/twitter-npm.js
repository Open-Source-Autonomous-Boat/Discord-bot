const envImports = require('../constants/env-imports');

// === TWITTER NPM === //
const twitter = require('twitter-lite');
const twitterclient = new twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: envImports.API_KEY, // from Twitter.
  consumer_secret: envImports.API_KEY_SECRET, // from Twitter.
  access_token_key: envImports.ACCES_TOKEN, // from your User (oauth_token)
  access_token_secret: envImports.ACCES_SECRET // from your User (oauth_token_secret)
});

module.exports = twitterclient