import request from "supertest";
import { app } from "../../app";

describe("Signup test suite", () => {
  const signupUrl = "/api/users/signup";
  it("return 201 when signup with valid payload and set cookie", async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({
        email: "test@test.com",
        password: "P@$$w0rd",
      })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
    expect(response.body.email).toBeDefined();
    expect(response.body.id).toBeDefined();
  });

  it("return 400 when passing invalid or missing payload ", async () => {
    return request(app).post(signupUrl).send({}).expect(400);
  });

  it("return 400 when passing password less than 5 character", async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({
        email: "test@test.com",
        password: "P",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe(
      "Password must be at least 5 characters"
    );
  });

  it("return 400 when signup with email already used before ", async () => {
    await request(app)
      .post(signupUrl)
      .send({
        email: "test@test.com",
        password: "P@$$w0rd",
      })
      .expect(201);

    return request(app)
      .post(signupUrl)
      .send({
        email: "test@test.com",
        password: "P@$$w0rd",
      })
      .expect(400);
  });
});
