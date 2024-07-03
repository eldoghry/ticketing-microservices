import { app } from "./app";
import { DatabaseConnectionException } from "./errors/database-error";
import mongoose from "mongoose";

const PORT = 4001;

async function start() {
  try {
    await mongoose.connect(
      "mongodb://ticketing-auth-mongo-cluster-ip-srv:27017/ticketing-auth"
    );
    console.log("Connected to database.");
  } catch (e) {
    console.log(e);
    throw new DatabaseConnectionException();
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
}

start();
