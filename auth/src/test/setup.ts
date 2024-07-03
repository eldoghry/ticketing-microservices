import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { beforeAll, afterAll, beforeEach } from "@jest/globals";
import request from "supertest";
import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      signUp(): Promise<string[]>; // Define the return type and argument types
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "testjwt";
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

// reset db after every test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) await collection.deleteMany({});
});

// close the db connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

// define helper function to be used on test
// global.signUp = async function () {
//   const email = "test@test.com";
//   const password = "P@$$w0rd";

//   const response = await request(app).post("/api/users/signup").send({
//     email,
//     password,
//   });

//   return response.get("Set-Cookie") as string[];
// };
