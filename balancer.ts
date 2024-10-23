import cluster from "node:cluster";
import os from "os";
import dotenv from "dotenv";
import http, { IncomingMessage, ServerResponse } from "http";
import { postController } from "./src/controllers/postController";
import { getController } from "./src/controllers/getControllers";
import { putController } from "./src/controllers/putController";
import { deleteController } from "./src/controllers/deleteController";
import { createResponse } from "./src/utils/createResponse";
import { RequestMessage } from "./src/types/types";

dotenv.config();
const PORT = process.env.LOAD_BALANCER_PORT || 4000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork({ SERVER_PORT: `${+PORT + i + 1}` });
  }

  let workerIndex = 0;
  const workers = Object.values(cluster.workers!);
  const numWorkers = workers.length;

  function getNextWorker() {
    const worker = workers[workerIndex];
    workerIndex = (workerIndex + 1) % numWorkers;
    return worker;
  }

  http
    .createServer((req, res) => {
      const worker = getNextWorker();
      worker!.send({ type: "request", request: req, response: res });
    })
    .listen(PORT, () => {
      console.log(`Load balancer listening on port ${PORT}`);
    });
} else {
  console.log(`Worker ${process.pid} started`);

  const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      const { method, url } = req;

      if (method === "GET" && url === "/api/users") {
        getController(req, res);
      } else if (method === "GET" && url?.startsWith("/api/users/")) {
        getController(req, res);
      } else if (method === "POST" && url === "/api/users") {
        postController(req, res);
      } else if (method === "PUT" && url?.startsWith("/api/users/")) {
        putController(req, res);
      } else if (method === "DELETE" && url?.startsWith("/api/users/")) {
        deleteController(req, res);
      } else {
        createResponse(
          res,
          404,
          "Invalid request : Requests to non-existing endpoints"
        );
      }
    }
  );

  server.listen(
    parseInt(PORT as string, 10) + (cluster.worker?.id || 0),
    () => {
      console.log(
        `Worker ${process.pid} listening on port ${parseInt(PORT as string, 10) + (cluster.worker?.id || 0)}`
      );
    }
  );

  process.on("message", (message: RequestMessage) => {
    if (message.type === "request") {
      server.emit("request", message.request, message.response);
    }
  });
}
