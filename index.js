const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/FE').then(()=>{
    console.log('Connected to MongoDB Database Server')
}).catch((err)=> console.log(err))


//Application level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

//In-built middleware
app.use(express.json());

//Router level middleware

app.use(login);


function login(req, res,next){
    res.send("Server is working")
}
//Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ err: err.message });
  });

app.listen(3000, ()=>{
    console.log('App is runing on port 3000.')
})
