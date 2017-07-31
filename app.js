const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to find weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = geocode.geocodeAddress(argv.address);

// Using callbacks instead of promises
// geocode.fetchLocation(encodedAddress, (errorMessage, results) => {
//     if(errorMessage){
//         console.log(errorMessage);
//     }else{
//         console.log(results.address);
//         weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//             if(errorMessage){
//                 console.log(errorMessage);
//             }else{
//                 console.log(`It's currently ${weatherResults.temp}, but it feels like ${weatherResults.apparentTemperature}`);
//             }
//         });
//     }
// });

geocode.fetchLocation(encodedAddress).then((location)=> {
    console.log(location.address);
    return weather.getWeather(location.latitude, location.longitude);
}).then((weatherResults) => {
    console.log(`It's currently ${weatherResults.temp}, but it feels like ${weatherResults.apparentTemperature}`);
}).catch((errorMessage) => {
    console.log(errorMessage);
})
