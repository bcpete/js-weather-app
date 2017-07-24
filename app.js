const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=5463%20lakewood%20terrace%20missouri',
    json: true
}, (error, response, body) => {
    console.log(body);
});