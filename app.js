require("./config/config");
require("./models/db");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const rtsIndex = require("./routes/index.router");

var app = express();
process.setMaxListeners(Infinity);
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/.netlify/function/api", rtsIndex);

// // Serve Angular app
// app.use(express.static("Angular"));

// // Route all other requests to Angular app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "Angular", "index.html"));
// });

// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started at port : ${process.env.PORT}`)
);
