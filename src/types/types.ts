import { IncomingMessage, ServerResponse } from "http";

export interface User {
  id: string;
  username: string;
  age: number | string;
  hobbies: string[];
}

export type RequestUser = Omit<User, "id">;

export interface RequestMessage {
  type: "request";
  request: IncomingMessage;
  response: ServerResponse;
}

export type TypeResponse = ServerResponse<IncomingMessage> & {
  req: IncomingMessage;
};

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}
