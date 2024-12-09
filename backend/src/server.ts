import express, { Application, Request, Response, NextFunction } from "express";
import userRoute from "./routes/userRoute";
import receiptTemplateRoute from "./routes/receiptTemplateRoute";
import mailRoute from "./routes/mailRoute";
import { auth } from "express-oauth2-jwt-bearer";
import { authNewUser } from "./middleWare/authNewUser";
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

import * as mongoose from "mongoose";
const PORT = 8080;

const app: Application = express();


const corsOptions = {
  origin: true, // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(express.json());

// public route
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
// TODO add eslint, rule - checking use await for async functions.


// Auth
const jwtCheck = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_URL,
  tokenSigningAlg: process.env.AUTH_ALGO,
});

app.use("/api", jwtCheck);
app.use("/api", authNewUser);

app.get("/api/test", (req, res) => {
  res.send({ message: "Hello World from protected!" });
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/receipt-templates", receiptTemplateRoute);
app.use("/api/send-mail", mailRoute);


app.use("/api", (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    console.error("UnauthorizedError:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log('CONNECTDB INVOKED');
    app.listen(PORT, () => {
      console.log(`Server listening`);
      
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
