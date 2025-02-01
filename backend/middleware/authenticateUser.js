const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtSecret = process.env.secretKey;

function fetchuser(req,res,next){
    const token = req.header("authToken");  // token in req header
if(!token){
    res.send("Not a valid token");
}
try {
    const data = jwt.verify(token, jwtSecret);      // this "data" will get payload given at time of user signup to authToken after verifying
    req.userId =  data.User.id;                     // Here i am taking id of payload : User
    next(); 
} catch (error) {
    console.log(error);
    res.status(400).send("internal error");
}
}
module.exports =fetchuser;