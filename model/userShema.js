import mongoose from 'mongoose';
//import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: Number
});

 
// we need to turn it into a model
const user = mongoose.model('userdata', userSchema);

export default user ;