import { IncomingMessage } from "http";
import { Methods, TypeResponse } from "../types/types";
import { getController } from "./getControllers";
import { postController } from "./postController";
import { putController } from "./putController";
import { deleteController } from "./deleteController";

export const controller = (req: IncomingMessage, res: TypeResponse) => {
  const { url, method } = req;

  if (!url || !method) return;

  if (method === Methods.GET) {
    return getController(url, res);
  }
  if (method === Methods.POST) {
    return postController(req, res);
  }
  if (method === Methods.PUT) {
    return putController(req, res);
  }
  if (method === Methods.DELETE) {
    return deleteController(req, res);
  }

  return { message: "Invalid request" };
};
