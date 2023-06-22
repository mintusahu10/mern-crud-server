import User from '../model/userShema.js';
import Googlelogin from '../model/loginbygoogle.js';
import LoginDetail from '../model/loginShema.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from  'jsonwebtoken';
//import Cookies from 'universal-cookie';
import { request } from 'express';

 //const cookies = new Cookies();

dotenv.config(); 
 
 
 export const addUsers = async(request,response)=>{

  
    
   //console.log(userdata);
    const user = request.body;
    //console.log('Signed Cookies: ', req.signedCookies)
    const newUser = new User(user);
    try {
        const userdata = await LoginDetail.findOne({_id:request.userID});
         if(userdata){
        await newUser.save();
        return response.status(201).json(newUser);}
        else{
            response.status(402).json({message:error.message});
        }
    } catch (error) {
          response.status(401).json({message:error.message});
    }
}
  
export const addLoginuserDetail = async(request,response)=>{
    const googlelogin = request.body;
    const newGooglelogin = new Googlelogin(googlelogin);
    try {
        await newGooglelogin.save();
        return response.status(201).json(newGooglelogin);
    } catch (error) {
        response.status(401).json({message:error.message});
    }
}

export const getUsers = async (request,response)=>{
    try {
        
            //console.log(root);
       const users= await User.find();
       response.status(201).json(users);
         }
         
    
     catch (error) {
        response.status(401).json({message:error.message});
        
    }
}

export const deleteUser = async(request , response)=>{
    try {
        await User.deleteOne({_id:request.params.id});
        response.status(201).json("User Delete Successfully");
    } catch (error) {
        response.status(401).json({message:error.message});
    }
}

export const getUserByID = async (request ,response)=>{
    
    try {
        const getUser = await User.findById({_id:request.params.id});
        response.status(201).json(getUser);
    } catch (error) {
        response.status(401).json({message:error.message});
        
    }
}

export const editUser = async (request,response)=>{
const user = request.body;
const editeduser = new User(user);
    try {
        await User.updateOne({_id:request.params.id},editeduser);
        response.status(201).json(editeduser);
    } catch (error) {
        response.status(401).json({message:error.message})
    }
}

export const signUp = async (request ,response)=>{
const {name , email , phone,password ,cpassword} = request.body;
if(!name ||!email || !phone||!password|| !cpassword){
    return response.status(422).json({error:"Please Fill the Field Properly"});
}
 try {
    const userexits = await LoginDetail.findOne({email:email});
    if(userexits){
        return response.status(422).json({error:"User Already Exist"});
    } 
    else if (password != cpassword){
        return response.status(422).json({error:"Password not matching"});
    }
    else{
          let salt = bcrypt.genSaltSync(10);
          let hashpassword = bcrypt.hashSync(password,salt);
          let hashcpassword = bcrypt.hashSync(cpassword,salt);

          

        const data = new LoginDetail({name,email,phone,password:hashpassword , cpassword:hashcpassword});

        
          await data.save();
         
      
   
    return response.status(201).json( data);
}
    
 } catch (error) {
    response.status(409).json({message:error.message});
 }
}


export const logIn = async (request,response)=> {
    const {email , password} =  request.body;
    if(!email || !password){
        return response.status(422).json({error:"Please Fill the Field Properly"});
}
    try {
       const existinguser= await LoginDetail.findOne({email:email});
       if(!existinguser){
        return response.status(422).json({error:"User not Exist Please signup first"});
       }
       const Ismatch = bcrypt.compareSync(password,existinguser.password);
       if(!Ismatch){
        return response.status(422).json({error:"Please try to login correct Credential"});
       }
       const dataToken = {
        existinguser:{
            id:existinguser.id
        }  
       }
const AuthToken= jwt.sign( dataToken,process.env.SECRET_KEY);
//console.log("Authtoken:",AuthToken);
 
//cookie set
//   cookies.set('jwttoken2', AuthToken, { path: '/' ,
//   sameSite: true
//  });
// console.log(cookies.get( 'jwttoken2'))
 
 
    
   
 return response.status(201).json( {existinguser,Auth:AuthToken});
 
     
        
    } catch (error) {
        response.status(409).json({message:error.message})
    }

}
 


export const singleuserdetail = async (request,response)=>{
    try {
        const user = await LoginDetail.findById({_id:request.params.id}).select('-password');
        response.status(201).json(user);
        
    } catch (error) {
        response.status(422).json({message:error.message});
        
    }
}
