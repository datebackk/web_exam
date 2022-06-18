const ngrok = require('ngrok');

const token = ngrok.authtoken();
console.log(token);