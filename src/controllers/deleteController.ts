import { IncomingMessage, ServerResponse, STATUS_CODES } from "http";
import { usersDB } from "../models/users";
import { createResponse } from "../utils/createResponse";
import { StatusCodes } from "../types/types";

export const deleteController = (req: IncomingMessage, res: ServerResponse) => {
  const { url } = req;

  if (!url) return;

  const transformedUrl = url.split("/");
  const path = transformedUrl[2];
  const id = transformedUrl[3];

  if (path === "users") {
    if (!id) {
      createResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "userId is invalid (not uuid)"
      );
      return;
    }

    const userIndex = usersDB.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      usersDB.splice(userIndex, 1);
      createResponse(res, StatusCodes.OK, "User deleted");
      return;
    } else {
      createResponse(res, StatusCodes.NOT_FOUND, "id === userId doesn't exist");
      return;
    }
  }

  createResponse(
    res,
    StatusCodes.NOT_FOUND,
    "Invalid request : Requests to non-existing endpoints"
  );
};
