import * as dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import config from "./config.json";
import router from "./api/router";

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

app.use("/api/v1", router);

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
