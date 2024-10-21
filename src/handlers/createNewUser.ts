import { users } from "../models/users";
import { User } from "types/types";
import { v4 as uuidv4 } from "uuid";

export const createNewUser = (user: string) => {
  const { username, age, hobbies } = JSON.parse(user);

  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };

  users.push(newUser);
};
