require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require("./routes/user-router");
const orderRouter = require("./routes/order-route");


//Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/FE').then(()=>{
    console.log('Connected to MongoDB Database Server')
}).catch((err)=> console.log(err))

//In-built middleware
app.use(express.json());

//Application level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });



//Router level middleware
app.use('/user' , userRouter);
app.use('/order' , orderRouter);

//Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ err: err.message });
  });

app.listen(3000, ()=>{
    console.log('App is runing on port 3000.')
})
