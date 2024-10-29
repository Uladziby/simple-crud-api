import { runServer } from "../app";
import { getUsersFromDB, usersDB } from "../models/users";
import request from "supertest";

const api = request(runServer);

describe("Checking Api-endpoints", () => {
  it("should get all records and return an empty array", async () => {
    const allUsers = getUsersFromDB();

    expect(allUsers).toEqual(usersDB);
  });
});
