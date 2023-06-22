import express from 'express';
 import  {signUp, logIn,addUsers ,  getUsers ,deleteUser ,getUserByID ,editUser ,singleuserdetail} from '../userController/userController.js';
import middleware from '../middleware/middleware.js';
const router = express.Router();

 
router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/home/:id' ,  singleuserdetail);

router.post('/add',  addUsers);
//router.post('/loginbygoogle' ,addLoginuserDetail);
 router.get('/all',  getUsers);
 router.delete('/:id',    deleteUser);
 router.get('/:id',  getUserByID);
 router.put('/:id' ,   editUser);


export default router; 