import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import Connection from './database/db.js';
import Routes from './Routes/Route.js'
import cookieParser from 'cookie-parser';
 


const app = express();
dotenv.config();
 
 //dotenv.config({path: './config.env'});
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
  


app.use('/', Routes);

 const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD );

const PORT = process.env.PORT || 8000;

app.listen(PORT , ()=> console.log(`Server is running successfully on PORT ${PORT}`));