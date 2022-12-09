const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});
fetchCoordsByIP('99.232.191.151', (error, data) => {
  if (error) {
    console.log('It did not work!', error)
    return;
  };
  console.log("It worked! Returned Coords:", data);
});

const coordinates = {
  latitude: -50,
  longitude: -25
}

const cb = function (error, result) {
  if (error) {
    console.log(error)
    return
  }
  console.log(result)
}

fetchISSFlyOverTimes(coordinates, cb)