import { IncomingMessage, ServerResponse } from "http";
import { users } from "../models/users";
import { createResponse } from "../utils/createResponse";

export const getController = (
  url: string,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  const transformedUrl = url.split("/");
  const path = transformedUrl[1];
  const id = transformedUrl[2];

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
