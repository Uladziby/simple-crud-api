import { IncomingMessage, ServerResponse } from "http";
import { users } from "../models/users";
import { createResponse } from "../utils/createResponse";

export const deleteController = (req: IncomingMessage, res: ServerResponse) => {
  const { url } = req;

  if (!url) return;

  const transformedUrl = url.split("/");
  const path = transformedUrl[1];
  const id = transformedUrl[2];

  if (path === "users") {
    if (!id) {
      createResponse(res, 400, "userId is invalid (not uuid)");
      return;
    }

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      createResponse(res, 200, "User deleted");
    } else {
      createResponse(res, 404, "id === userId doesn't exist");
    }
  }
};
