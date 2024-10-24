import { ServerResponse } from "http";

export const createResponse = (
  res: ServerResponse,
  statusCode: number,
  message: string
) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify(message));
};
