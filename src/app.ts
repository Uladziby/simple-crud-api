import { controller } from "./controllers/index";
import { createServer } from "node:http";

const hostname = "localhost";

export const runServer = async () => {
  const server = createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    controller(req, res);
  });

  server.listen(Number(process.env.PORT), hostname, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
  });
};
