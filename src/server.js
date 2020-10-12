const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const mongodb = require("./config/mongoose");
const bodyParser = require("body-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// setting port

// Connect MongoDB
mongodb.connect();
// Morgan
app.use(morgan("dev"));
app.engine(
  "hbs",
  exphbs({
    helpers: {
      // formatDate: formatDate,
      // turnToList: turnToList,
    },
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// HANDLING CORS ERRORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.headers("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
// View Engine
app.set("view engine", ".hbs");

app.use(
  sassMiddleware({
    src: __dirname + "/sass",
    dest: __dirname + "/public",
    debug: true,
  })
);
// Load Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/stylesheets")));
// app.use("/uploads", express.static("uploads"));

// Routes Loading
const indexRouter = require("./routes/index");

// Routes  Usage
app.use("/", indexRouter);
app.use("*", (req, res, next) => {
  res.status(404).render("./../src/views/404.hbs", {
    title: "404 Error",
  });
});
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server on PORT 3000 ...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
