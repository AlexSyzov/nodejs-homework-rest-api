const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { HttpCode } = require("./helpers/constants");
const { apiLimit, jsonLimit } = require("./config/rateLimit.json");

const contactsRouter = require("../routes/api/contacts");
const authRouter = require("../routes/api/auth");
const usersRouter = require("../routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: jsonLimit }));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(
  "/api/",
  rateLimit({
    windowMs: apiLimit.windowsMs,
    max: apiLimit.max,
  })
);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `Use API on routes ${req.baseUrl}/api/`,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  err.Status = err.Status ? err.Status : HttpCode.INTERNAL_SERVER_ERROR;

  res.status(err.Status).json({
    Status: err.message.includes("validation")
      ? "400 Bad Request"
      : err.Status === 500
      ? "500 Internal Server Error"
      : err.Status + " " + err.data,
    ["Content-Type"]: "application/json",
    ResponseBody: {
      message: err.message,
    },
  });
});

module.exports = app;
