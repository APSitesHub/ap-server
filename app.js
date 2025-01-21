const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/main");
const leadsRouter = require("./routes/leads");
const adminsRouter = require("./routes/admins");
const linksRouter = require("./routes/links");
const speakingLinksRouter = require("./routes/linksSpeaking");
const lessonsRouter = require("./routes/lessons");
const timetableRouter = require("./routes/timetable");
const kahootsRouter = require("./routes/kahoots");
const hostKahootsRouter = require("./routes/hostKahoots");
const collectionsRouter = require("./routes/collections");
const ratingsRouter = require("./routes/ratings");
const translationLeadsRouter = require("./routes/tr-leads");
const tokensRouter = require("./routes/tokens");
const trialUsersRouter = require("./routes/trialUsers");
const usersRouter = require("./routes/users");
const teachersRouter = require("./routes/teachers");
const usersSpeakingRouter = require("./routes/usersSpeaking");
const universityLeadsRouter = require("./routes/universityLeads");
const testUsersSpeakingRouter = require("./routes/testUsersSpeaking");
const webhookKommo = require("./routes/webhookKommo");
const teacherBot = require("./routes/teacherBot");
const uniUsers = require("./routes/uniUsers");
const uniLinks = require("./routes/uniLinks");
const uniKahoots = require("./routes/uniKahoots");
const uniHostKahoots = require("./routes/uniHostKahoots");
const uniCollections = require("./routes/uniCollections");
const uniTimetables = require("./routes/uniTimetable");
const videochatRooms = require("./routes/videochatRooms");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.use("/leads", leadsRouter);
app.use("/admins", adminsRouter);
app.use("/links", linksRouter);
app.use("/speakings", speakingLinksRouter);
app.use("/lessons", lessonsRouter);
app.use("/timetable", timetableRouter);
app.use("/kahoots", kahootsRouter);
app.use("/collections", collectionsRouter);
app.use("/host-kahoots", hostKahootsRouter);
app.use("/ratings", ratingsRouter);
app.use("/tr-leads", translationLeadsRouter);
app.use("/tokens", tokensRouter);
app.use("/trialUsers", trialUsersRouter);
app.use("/users", usersRouter);
app.use("/teachers", teachersRouter);
app.use("/speakingusers", usersSpeakingRouter);
app.use("/sctest", testUsersSpeakingRouter);
app.use("/uni-leads", universityLeadsRouter);
app.use("/webhooktest", webhookKommo);
app.use("/srm_bot", teacherBot);
app.use("/uniusers", uniUsers);
app.use("/unilinks", uniLinks);
app.use("/unikahoots", uniKahoots);
app.use("/unihostkahoots", uniHostKahoots);
app.use("/unicollections", uniCollections);
app.use("/unitimetable", uniTimetables);
app.use("/room", videochatRooms);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
