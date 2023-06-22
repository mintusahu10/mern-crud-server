import dotenv from 'dotenv';
import jwt from  'jsonwebtoken';
import LoginDetail from '../model/loginShema.js';
 
dotenv.config();
 

const middleware =  async (request , response,next)=>{
    // const Token = request.headers['authorization'];
    // console.log(Token);
    // next();
 try{
   const Token = request.headers['authorization'];
   console.log(Token);
if(!Token){
    response.status(401).json({error:"Please Aututhentiucate using a valid token"})
    return;
}
const data = jwt.verify(Token, process.env.SECRET_KEY);
//console.log(data.existinguser.id);

const rootUser = await LoginDetail.findOne({_id:data.existinguser.id});
if(!rootUser){throw new Error('User not Found')}
request.Token = Token;
request.rootUser = rootUser;
request.userID = rootUser._id;
 
next();
}
catch (err) {
    response.status(401).send("Unauthorized:No token provided");
    console.log(err);
    
 }
}

export default middleware;






 