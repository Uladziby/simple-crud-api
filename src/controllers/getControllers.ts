import { IncomingMessage, ServerResponse } from "http";
import { users } from "../models/users";
import { createResponse } from "../utils/createResponse";

export const getController = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const { url } = req;

  if (!url) return;

  const transformedUrl = url.split("/");
  const path = transformedUrl[2];
  const id = transformedUrl[3];

  if (path === "users") {
    if (id) {
      const user = users.find((user) => user.id === id);
      if (user) {
        res.statusCode = 200;
        res.end(JSON.stringify(user));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "User not found" }));
      }
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(users));
    }
  } else {
    createResponse(
      res,
      404,
      "Invalid request : Requests to non-existing endpoints"
    );
  }
};
