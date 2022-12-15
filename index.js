const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/FE').then(()=>{
    console.log('Connected to MongoDB Database Server')
}).catch((err)=> console.log(err))

app.use(login);


function login(req, res,next){
    res.send("Server is working")
}

app.listen(3000, ()=>{
    console.log('App is runing on port 3000.')
})
