import { getController } from "./getControllers";

export const controller = (url: string, method: string) => {
  if (method === "GET") {
    return getController(url);
  }

  return { message: "Invalid request" };
};
