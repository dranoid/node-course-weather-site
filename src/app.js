const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectorypath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setupo static directory to serve
app.use(express.static(publicDirectorypath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Daramola Dunsin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Daramola Dunsin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "The help we talked about is coming soon to this place",
    title: "Help me!",
    name: "Daramola Dunsin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address not provided",
    });
  }

  const address = req.query.address;

  geoCode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        location,
        address,
        forecast: forecastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You need to provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

// For the 404 pages
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found",
    title: "404",
    name: "Daramola Dunsin",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Page not found",
    title: "404",
    name: "Daramola Dunsin",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
