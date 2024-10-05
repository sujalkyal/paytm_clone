const { JWT_SECRET } = require("../config");

function authMiddleware(req,res,next){
    let auth_headers = req.headers.authorization;

    if(!auth_headers || !auth_headers.startsWith('Bearer ')){
        return res.status(403).json({})
    }

    const token = auth_headers.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({})
        }
        
    }catch(err){
        return res.status(403).json({})
    }
}

module.exports = {authMiddleware}