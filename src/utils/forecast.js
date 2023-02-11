const request = require("request");

function forecast(latitude, longitude, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=43ad40ad54421a7a8b871d6b3a99d897&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      let current = body.current;
      let dataStr =
        current.weather_descriptions[0] +
        ". " +
        "It is currently " +
        current.temperature +
        " degrees out, it feels like " +
        current.feelslike +
        " degrees out. The humidity is " +
        current.humidity +
        "%.";
      callback(undefined, dataStr);
    }
  });
}

module.exports = forecast;
