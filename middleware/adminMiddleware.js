const JWT_ADMIN = "dasdsdasdasdasdadasd";
const jwt = require('jsonwebtoken');

function adminMiddleware(req,res,next){
    const token = req.headers['token'];
    const decoded = jwt.verify(token,JWT_ADMIN);

    if(decoded){
        req.admin_id = decoded.id;
        next();
    }
    else{
        res.status(404).json({
            message:"error"
        })
    }
}

module.exports = {
    adminMiddleware:adminMiddleware
}

// const jwt = require('jsonwebtoken');
// const JWT_ADMIN = "dasdsdasdasdasdadasd";

// function adminMiddleware(req, res, next) {
//     const token = req.headers['token']; // Correctly retrieve the token from the headers

//     if (!token) {
//         return res.status(401).json({ message: "JWT token is required" });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_ADMIN);
//         req.admin_id = decoded.id;
//         next(); // Call the next middleware if token is valid
//     } catch (e) {
//         res.status(403).json({ message: "Invalid or expired JWT token" });
//     }
// }

// module.exports = {
//     adminMiddleware: adminMiddleware
// };
