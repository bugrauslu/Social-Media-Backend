/** @format */

import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
const app = express();
app.use(express.json())
app.use("/api/user",router) 
app.use("/api/blog",blogRouter)
mongoose
    .connect("mongodb+srv://bugrauslu:bugrauslu@bugra.v23tn.mongodb.net/Social-Media?retryWrites=true&w=majority")
    .then(() => app.listen(5000))
    .then(() => {
        console.log("database connection success and listening to localhost 5000");
    })
    .catch((err) => {
        console.log(`database connection err = ${err}`);
    });

// app.use("/api", (req, res, next) => {
//     res.send("hello world");
// });
