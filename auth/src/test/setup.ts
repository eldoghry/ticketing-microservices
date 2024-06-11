import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { beforeAll, afterAll, beforeEach } from "@jest/globals";

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
