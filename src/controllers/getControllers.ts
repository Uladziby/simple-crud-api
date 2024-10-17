import { users } from "../models/users";

export const getController = (url: string) => {
  const transformedUrl = url.split("/");
  const path = transformedUrl[1];
  const id = transformedUrl[2];

  if (path === "users") {
    if (id) {
      const user = users.find((user) => user.id === id);
      return user;
    }
    console.log(path, "path");
    return users;
  }
  return null; // or any default value
};
