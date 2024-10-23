import { controller } from "./controllers/index";
import { createServer } from "node:http";
import * as dotenv from "dotenv";
import { resolve } from "path";

export const runServer = async () => {
  const server = createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    controller(req, res);
  });

  dotenv.config({ path: resolve(__dirname, "../.env") });

  server.listen(Number(process.env.USERS_SERVICE_PORT)).on("listening", () => {
    console.log(
      `Server running at http://localhost:${process.env.USERS_SERVICE_PORT}/`
    );
  });
};
