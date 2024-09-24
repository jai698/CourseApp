const JWT_USER = "dasdsadasd";
const jwt = require('jsonwebtoken');

function userMiddleware(req,res,next){
    const token = req.headers['token'];
    const decoded = jwt.verify(token,JWT_USER);

    if(decoded){
        req.user_id = decoded.id;
        next();
    }
    else{
        res.status(404).json({
            message:"error"
        })
    }
}

module.exports = {
    userMiddleware:userMiddleware
}