var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var operatorsRouter = require("./routes/operators");
const service_prividersRouter = require("./routes/service_prividers");
const contractRouter = require("./routes/contracts");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/operators", operatorsRouter);
app.use("/service_providers", service_prividersRouter);
app.use("/contracts", contractRouter);

module.exports = app;
