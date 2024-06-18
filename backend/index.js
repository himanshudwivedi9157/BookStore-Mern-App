
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './route/book.route.js';
import cors from 'cors';
import userRoute from './route/user.route.js'


const app = express();

app.use(cors());
app.use(express.json())

dotenv.config();


const PORT=process.env.PORT||4000;
 
const uri=process.env.Mongo_db_url;


//connect to mongodb
try {
  
mongoose.connect(uri)
  console.log("Connected to mongodb");
} catch (error) {
    console.log("error:", error);
}

//defining route
app.use('/book',bookRoute)
app.use("/user",userRoute)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})