const request = require(`request`);

console.log("Hello From Sun-Hour JS File");

function SunHour(zipcode) {
  console.log(`sunhour()`);
  return new Promise((resolve, reject) => {
    console.log(`sunhour: ${zipcode}`);
    Promise.resolve()
    .then(() => sunHourReq(zipcode))
    .then((sunhour) => {
      return { "SunHour": sunhour }
    })
    .then((ret) => resolve(ret))
    .catch((err) => reject(err));
  })
}

function sunHourReq(zipcode) {
  return new Promise((resolve, reject) => {
    Promise.resolve()
    .then(() => request(
      `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=8U9Gc9Kvw49R8DFrOQNCv9PiO31s88NbngLeRaQ5&address=${zipcode}`, 
      (error, response, body) => {
        console.log(`error :`, error);
        console.log(`statusCode sun-hour :`, response && response.statusCode );
        
        var content = JSON.parse(body);
        console.log(content);
        // return content.outputs.avg_lat_tilt.annual;
        resolve(content.outputs.avg_lat_tilt.annual);
      }
    ))
    // .then((ret) => resolve(ret))
    .catch((err) => reject(err));
  });
}

module.exports = SunHour;