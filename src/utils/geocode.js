const request = require("request");

function geoCode(address, callback) {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=32dd0bf99dc5f24dcc3d94daa2096015&query=" +
    encodeURIComponent(address) +
    "&limit=1";
  request({ url, json: true }, (err, { body }) => {
    // destructured response.body
    if (err) {
      callback("Unable to connect to geo location service!", undefined);
    } else if (body.error) {
      callback(
        body.error.context.query.type + ": " + body.error.context.query.message,
        undefined
      );
    } else if (body.data.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      let data = body.data;
      callback(undefined, {
        location: data[0].name + ", " + data[0].region,
        latitude: data[0].latitude,
        longitude: data[0].longitude,
      });
    }
  });
}
module.exports = geoCode;
