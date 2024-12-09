const mongoose = require("mongoose");
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export const initializeMongoServer = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
  console.log("Connected to mongo");
};

export const kill = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
