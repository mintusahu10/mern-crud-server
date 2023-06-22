import express from 'express';
 import  {signUp, logIn,addUsers ,  getUsers ,deleteUser ,getUserByID ,editUser ,singleuserdetail} from '../userController/userController.js';
import middleware from '../middleware/middleware.js';
const router = express.Router();

 
router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/home/:id' ,  singleuserdetail);

router.post('/add',middleware, addUsers);
//router.post('/loginbygoogle' ,addLoginuserDetail);
 router.get('/all', middleware,getUsers);
 router.delete('/:id', middleware,  deleteUser);
 router.get('/:id',middleware, getUserByID);
 router.put('/:id' , middleware, editUser);


export default router; 