const { fetchMyIP, fetchCoordsByIP } = require('./iss');


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