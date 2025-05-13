import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export default () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
      console.log("DB connection failed");
      console.error(error);
      process.exit(1);
    });
};

