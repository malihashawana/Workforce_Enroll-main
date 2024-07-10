import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bookRouter from "./route/book.route.js";
import userRouter from "./route/user.route.js";
import user1Router from "./route/company.route.js";
import adminRouter from "./route/admin.route.js";

import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(express.json())


const PORT=process.env.PORT || 4000;
const URI= process.env.MongoBDURI;


//connect to mongoDB
/*try{
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    console.log("Connected to mongoDB");

}catch(error){
    console.log("Error:",error)

}

app.use("/book",bookRouter)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})*/
mongoose.connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/user1", user1Router);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})