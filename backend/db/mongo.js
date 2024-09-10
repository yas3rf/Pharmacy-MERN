import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PMS",
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(`some error occured DB Not connected ${err}`);
    });
};
