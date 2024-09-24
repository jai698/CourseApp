const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");


app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/course',courseRouter);

async function fn(){
    await mongoose.connect('mongodb+srv://jai:kanishk49@cluster0.mdaxodf.mongodb.net/courseApp');
    console.log("DB CONNECTED");
    app.listen(3001);
    console.log("SERVER STARTED");
}

fn();