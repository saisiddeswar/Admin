// index.js
const express = require("express");
const cors = require("cors");
const connectDb = require("./utility/db");
const errorMiddleware = require("./middleware/error-middleware");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(errorMiddleware);

// Routes
const authRouter = require("./router/auth-router");
app.use("/api/auth", authRouter);

// Connect to the database and start the server
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
});