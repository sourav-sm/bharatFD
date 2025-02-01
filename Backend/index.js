require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser");
const faqRoutes=require("./Routes/faqRoutes");

const app=express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/faqs",faqRoutes);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("MongoDb Connected"))
.catch(err=>console.log(err));

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));