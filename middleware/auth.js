const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next)=>{
    if(!req.headers.authorized){
        let err = new Error('Authorization token is misssing.')
        return next(err)
    }
    const token = req.headers.authorization.split('')[1]
    jwt.verify(token, process.env.SECRET,(err, decoded)=>{
        if(err) return next(err)
        console.log(decoded)
        req.user = decoded
        next()
    })
    console.log(token)
}

const verifyAdmin = (req, res, next) =>{
    if(req.user.role != 'Admin'){
        let err = new Error('You are not authorized.')
        res.status(403)
        return next(err)
    }
    next()
}

const verifyRestaurant = (req, res, next) =>{
    if(req.user.role == 'Restaurant' || req.user.role == 'Admin'){
        return next()
    }
    res.status(403)
    next(new Error('Not authorized'))    
}
module.exports = {verifyUser, verifyAdmin, verifyRestaurant}