import { createResponse } from "../utils/createResponse";
import { IncomingMessage } from "http";
import { Methods, StatusCodes, TypeResponse } from "../types/types";
import { getController } from "./getControllers";
import { postController } from "./postController";
import { putController } from "./putController";
import { deleteController } from "./deleteController";

export const controller = (req: IncomingMessage, res: TypeResponse) => {
  switch (req.method) {
    case Methods.GET:
      return getController(req, res);
    case Methods.POST:
      return postController(req, res);
    case Methods.PUT:
      return putController(req, res);
    case Methods.DELETE:
      return deleteController(req, res);
    default:
      createResponse(
        res,
        StatusCodes.NOT_FOUND,
        "Invalid request : Requests to non-existing endpoints"
      );
  }
};
