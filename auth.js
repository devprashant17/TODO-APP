const jwt = require('jsonwebtoken');
const JWT_SECRET = "ioeIOE@123";

function auth(req,res,next){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token,JWT_SECRET);
    if(decodedInfo){
        req.userId = decodedInfo.id;
        next();
    }
    else{
        res.json({
            msg:"Wrong creds"
        });
    }
}

module.exports={
    auth,
    JWT_SECRET
}