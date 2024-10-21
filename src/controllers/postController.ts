import { createNewUser } from "../handlers/createNewUser";
import { IncomingMessage, ServerResponse } from "node:http";
import { TypeResponse } from "types/types";
import { createResponse } from "../utils/createResponse";

export const postController = (req: IncomingMessage, res: ServerResponse) => {
  const path = req.url!.split("/")[1];
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      createResponse(res, 400, "body does not contain required fields");
      return;
    }

    if (path === "users") {
      createNewUser(body);
      createResponse(res, 201, "User created");
      return;
    }

    createResponse(
      res,
      404,
      "Invalid request : Requests to non-existing endpoints"
    );
  });
};
