const request = require('request');

var getWeather = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/6ae96143c026bc6ca14a6e319a3ee1e6/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            callback(undefined, {
                temp: body.currently.temperature
            });
        }else {
            callback('UH OH: unable to fetch weather :(');
        }  
    });
    console.log('Fetching weather...');
};

module.exports.getWeather = getWeather;