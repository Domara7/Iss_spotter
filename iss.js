const request = require('request')

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      return callback('There has been an error getting the callback')
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    };
    const ip = JSON.parse(body).ip;
    callback(null, ip)
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback('There has been an error getting the coordinates', null);
    };
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    };

    let result = JSON.parse(body);
    console.log(result)

    if (result.success === false) {
      callback(result.message, null)
      return;
    };
    let data = {
      latitude: result.latitude,
      longitude: result.longitude
    };
    callback(null, data);
  });
};
const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback('There has been an error getting the FlyOverTime', null);
    };
    // console.log(response)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching FlyOverTime. Response: ${body}`;
      callback(Error(msg), null);
      return;
    };
      const result = JSON.parse(body)
      callback(null, result.response)

     });
};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };