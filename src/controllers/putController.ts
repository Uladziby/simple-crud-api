import { IncomingMessage, ServerResponse } from "http";
import { usersDB } from "../models/users";
import { createResponse } from "../utils/createResponse";

export const putController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url!.split("/");
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
    const { username, age, hobbies } = JSON.parse(body);
    const id = url[3];

    if (url[2] !== "users") {
      createResponse(
        res,
        404,
        "Invalid request : Requests to non-existing endpoints"
      );
      return;
    }

    const user = usersDB.find((user) => user.id === id);

    if (!user) {
      createResponse(res, 404, "User not found");
      return;
    }

    if (!id) {
      createResponse(res, 400, "userId is invalid (not uuid)");
      return;
    }

    const updatedUser = {
      id,
      username,
      age,
      hobbies,
    };

    const userIndex = usersDB.findIndex((user) => user.id === id);

    usersDB.splice(userIndex, 1, updatedUser);

    createResponse(res, 200, "User updated");
  });
};
