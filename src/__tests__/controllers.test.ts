import { runServer } from "app";
import request from "supertest";

const api = request(runServer);

describe("Checking Api-endpoints", () => {
  it("should get all records and return an empty array", async () => {
    const response = await api.get("api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
