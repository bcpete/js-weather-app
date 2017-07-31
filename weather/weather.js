const request = require('request');

// using callbacks instead of promises
// var getWeather = (lat, long, callback) => {
//     request({
//         url: `https://api.darksky.net/forecast/6ae96143c026bc6ca14a6e319a3ee1e6/${lat},${long}`,
//         json: true
//     }, (error, response, body) => {
//         if(!error && response.statusCode === 200){
//             callback(undefined, {
//                 temp: body.currently.temperature,
//                 apparentTemperature: body.currently.apparentTemperature
//             });
//         }else {
//             callback('UH OH: unable to fetch weather :(');
//         }  
//     });
//     console.log('Fetching weather...');
// };

//request does not support promises, so i wrap the request inside of a promise. Next time I will use a library that
//supports promises
var getWeather = (lat, long) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/6ae96143c026bc6ca14a6e319a3ee1e6/${lat},${long}`,
            json: true
        }, (error, response, body) => {
            if(!error && response.statusCode === 200){
                resolve({
                    temp: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }else {
                reject('UH OH: unable to fetch weather :(');
            }  
        });
        console.log('Fetching weather...');
        })
    }

module.exports.getWeather = getWeather;