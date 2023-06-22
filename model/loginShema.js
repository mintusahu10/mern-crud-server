import mongoose, { Mongoose } from "mongoose";


const LoginshemaDetail = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
     
    
});
const loginDetail = mongoose.model('logindata',LoginshemaDetail);

export default loginDetail;


