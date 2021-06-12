import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
export const db = low(adapter);

db.defaults({ menuItems: [], orders: [] }).write();

var menuRouter = require("./routes/menu");
// var checkoutRouter = require("./routes/checkout");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/menu", menuRouter);
// app.use("/checkout", checkoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// app.get("/menu", async (req, res, next) => {
// 	const { menuItems } = db.get("menuItems").value();
// 	res.json(menuItems);
// });

module.exports = app;
