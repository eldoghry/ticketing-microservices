import request from "supertest";
import { app } from "../../app";
import { describe, it, expect } from "@jest/globals";

describe("SignOut test suite", () => {
  const signOutUrl = "/api/users/signout";
  it("return 200 when signOut", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "P@$$w0rd",
      })
      .expect(201);

    const response = await request(app).post(signOutUrl).send().expect(200);
    expect(response.get("Set-Cookie")?.pop()).toBe(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
