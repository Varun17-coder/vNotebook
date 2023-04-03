//   middleware function used to call whenever we have use the login credentials
// used in ROUTE 3
const jwt = require('jsonwebtoken');
const JWT_SEC="mainhoondevil";

const fetchuser=(req,res,next)=>{
    // Get user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate using valid token"})
    }


    try {
        const data=jwt.verify(token,JWT_SEC) 
        req.user=data.user;
        next();// next() function is used to call the next finction where the middleware is used
            
    } catch (error) {
        res.status(401).send({error:"Please Authenticate using valid token"})
    }
    

     
}
module.exports=fetchuser;