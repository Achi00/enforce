import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import braintree from "braintree";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import orderRouter from "./routes/order.routes.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

// Braintree Configuration
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use Environment.Production when app is in production
  merchantId: "r6nzsbk3vn4wr6bs",
  publicKey: "p9xs7nyqfd8sd6pf",
  privateKey: "d709bbfde414fa47d3a640a8b476b1d1",
});

app.get("/client_token", (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("Generated clientToken: ", response.clientToken); // Log this value
      res.json({ clientToken: response.clientToken });
    }
  });
});

app.get("/", (req, res) => {
  res.send({ message: "Hi" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/powder", postRouter);
app.use("/api/v1/amino", postRouter);
app.use("/api/v1/vitamin", postRouter);
app.use("/api/v1/gainer", postRouter);
app.use("/api/v1/order", orderRouter);

const startServer = async () => {
  try {
    // connect to db
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
