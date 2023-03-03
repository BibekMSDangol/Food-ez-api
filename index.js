require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const auth = require('./middleware/auth')
const userRouter = require("./routes/user-router");
const orderRouter = require("./routes/order-route");
const restaurantRouter = require("./routes/restaurant-router")
const foodRouter = require("./routes/food-router")
const menuRouter = require("./routes/menu-router")
const cors = require('cors')

//Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/FE').then(()=>{
    console.log('Connected to MongoDB Database Server')
}).catch((err)=> console.log(err))

app.use(
  "/uploads",
  express.static(path.join(__dirname, "/uploads"))
);
app.use(cors());
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
app.use('/restaurant', restaurantRouter);
app.use('/food', foodRouter);
app.use('/menu', menuRouter);
//Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ err: err.message });
  }); 

app.listen(3000, ()=>{
    console.log('App is runing on port 3000.')
})
