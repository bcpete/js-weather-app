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

geocode.fetchLocation(encodedAddress, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        JSON.stringify(results, undefined, 2);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log(results);
            };
        });
    };
});
