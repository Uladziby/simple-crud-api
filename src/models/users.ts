import { User } from "@/src/types/types";

export const usersDB: User[] = [
  {
    id: "1",
    username: "John",
    age: 30,
    hobbies: ["reading", "travelling"],
  },
  {
    id: "2",
    username: "Jane",
    age: 25,
    hobbies: ["cooking", "swimming"],
  },
];

export const getUsersFromDB = async () => {
  return usersDB;
};
