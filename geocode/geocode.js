const request = require('request');

//encodes the address to be injected into the api url
var geocodeAddress = (address) => {
    encodedAddress = encodeURIComponent(address);
    return encodedAddress;
};

// using callbacks instead of promises
//queries google api for the lat and long of the address passed in
// var fetchLocation = (address, callback) => {
//     request({
//         url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
//         json: true
//     }, (error, response, body) => {
//         if (error) {
//             callback('UH OH: Unable to connect to Google api :(');
//         }else if (body.status === 'ZERO_RESULTS') {
//             callback('UH OH: Unable to find address :(');
//         }else{
//             callback(undefined, {
//                 address: body.results[0].formatted_address,
//                 latitude: body.results[0].geometry.location.lat,
//                 longitude: body.results[0].geometry.location.lng
//             });
//         }
//     });
//     console.log('Fetching location...');
// };

//request does not support promises, so i wrap the request inside of a promise. Next time I will use a library that
//supports promises
var fetchLocation = (address) => {
    return new Promise((resolve, reject) => {
            request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            reject('UH OH: Unable to connect to Google api :(');
        }else if (body.status === 'ZERO_RESULTS') {
            reject('UH OH: Unable to find address :(');
        }else{
            resolve({
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
    console.log('Fetching location...');
    })
};




module.exports = {
    geocodeAddress,
    fetchLocation
};

