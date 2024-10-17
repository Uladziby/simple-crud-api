import { controller } from "./controllers/index";
import { createServer } from "node:http";

const hostname = "localhost";

export const runServer = async () => {
  const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    const { url, method } = req;

    if (!url || !method) return;

    const response = controller(url, method);

    console.log(response, "response");
    res.end(JSON.stringify(response));
  });

  server.listen(Number(process.env.PORT), hostname, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
  });
};
