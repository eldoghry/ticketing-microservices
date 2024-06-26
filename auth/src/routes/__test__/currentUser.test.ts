import request from "supertest";
import { app } from "../../app";
import { describe, it, expect } from "@jest/globals";

describe("Current test suite", () => {
  const currentUrl = "/api/users/current";
  it("return 200 when sign in with valid credentials", async () => {
    const email = "test@test.com";

    const signupRes = await request(app)
      .post("/api/users/signup")
      .send({
        email,
        password: "P@$$w0rd",
      })
      .expect(201);

    const cookie = signupRes.get("Set-Cookie") as string[];
    const response = await request(app)
      .get(currentUrl)
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.user).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.email).toBe(email);
  });

  it("return null when token is missing or invalid", async () => {
    const response = await request(app).get(currentUrl).expect(200);
    expect(response.body.user).toBeNull();
  });
});
