import { ServerResponse } from "http";
import { getUsersFromDB } from "../models/users";
import { StatusCodes } from "@/src/types/types";

export const getUsers = async (res: ServerResponse) => {
  const users = getUsersFromDB();

  res.writeHead(StatusCodes.OK, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));

  return users;
};
