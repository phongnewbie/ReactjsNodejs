const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
app.use(express.json())
const cookieParser = require("cookie-parser");
const apiLogin = require("./routes/apiLogin")
const userRoute =require("./routes/user")

dotenv.config();
const bodyParser = require("body-parser") 
async function connect() {
  try {
    // Connect to MongoDB using Promise-based approach
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB successfully!');
    console.log(process.env.MONGODB_URL);

    // Perform operations using the connected MongoDB client
    // ...
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}
connect();
// Get the collection
app.use(cors())
app.use(cookieParser())
//ROUTES
app.use("/routes/apiLogin",apiLogin)
app.use("/routes/getalluser",userRoute)
app.use("/routes/user",userRoute)


app.get('/',async(req,res)=>{
  let img='';
  let qr= await QRCode.toDataURL('I am Cuamotcang!');
  console.log(qr);
  img = `<image src= " `+qr+ `" />`
  return res.send(img);
});

app.use(express.urlencoded({ extended: true }));
app.listen(8000, ()=>{
  console.log("server is running");
});         