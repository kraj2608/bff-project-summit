import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import config from "./config.json";
import router from "./api/router";
import Authorizer from "./middleware/authorize";

const app = express();
app.server = http.createServer(app);

app.use(morgan("dev"));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders,
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  })
);

app.use("/api/v1", Authorizer(), router);

app.server.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});

export default app;
