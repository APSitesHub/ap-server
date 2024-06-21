const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const router = require("./routes/main");
const leadsRouter = require("./routes/leads");
const adminsRouter = require("./routes/admins");
const linksRouter = require("./routes/links");
const lessonsRouter = require("./routes/lessons");
const timetableRouter = require("./routes/timetable");
const kahootsRouter = require("./routes/kahoots");
const hostKahootsRouter = require("./routes/hostKahoots");
const collectionsRouter = require("./routes/collections");
const ratingsRouter = require("./routes/ratings");
const translationLeadsRouter = require("./routes/tr-leads");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({limit: '2mb'}));

app.use("/", router);
app.use("/leads", leadsRouter);
app.use("/admins", adminsRouter);
app.use("/links", linksRouter);
app.use("/lessons", lessonsRouter);
app.use("/timetable", timetableRouter);
app.use("/kahoots", kahootsRouter);
app.use("/collections", collectionsRouter);
app.use("/host-kahoots", hostKahootsRouter);
app.use("/ratings", ratingsRouter);
app.use("/tr-leads", translationLeadsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
