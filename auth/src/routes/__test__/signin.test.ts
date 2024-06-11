import request from "supertest";
import { app } from "../../app";

describe("SignIn test suite", () => {
  const signInUrl = "/api/users/signIn";
  it("return 200 when sign in with valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "P@$$w0rd",
      })
      .expect(201);

    const response = await request(app)
      .post(signInUrl)
      .send({
        email: "test@test.com",
        password: "P@$$w0rd",
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
    expect(response.body.email).toBeDefined();
    expect(response.body.id).toBeDefined();
  });

  it("return 400 when sign in with invalid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "P@$$w0rd",
      })
      .expect(201);

    await request(app)
      .post(signInUrl)
      .send({
        email: "test@test.com",
        password: "P@$$w0rd123",
      })
      .expect(400);
  });

  it("return 400 when sign in with email that not exist", async () => {
    const response = await request(app)
      .post(signInUrl)
      .send({
        email: "email.notexist@test.com",
        password: "P@$$w0rd123",
      })
      .expect(400);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe("Invalid Credentials.");
  });
});
