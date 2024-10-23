import { User } from "../../src/types/types";
import { usersDB } from "../models/users";
import { v4 as uuidv4 } from "uuid";

export const createNewUser = (user: string) => {
  const { username, age, hobbies } = JSON.parse(user);

  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };

  usersDB.push(newUser);

  return newUser;
};
