import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import router from "./Routes/index.js";

const app = express();
const PORT = process.env.PORT || 7000;

//middleware
app.use(express.json());
app.use(cors());
app.use("/", router);

const server = mongoose
  .connect(process.env.SECRET_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Listning on port ${PORT}`)))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

process.on("unhandledRejection", (err, promise) => {
  console.log("logged error", err);
  server.close(() => process.exit(1));
});
