import mongoose from "mongoose";

export const connect = async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    mongoose.connection.on("Connect",()=>{
      console.log("Connected to DB");
    })
    mongoose.connection.on("error",(err)=>{
      console.log("Something went wrong: "+err);
      process.exit(1);
    })
    
  } catch (error) {
    console.log("Couldn't connect to DB")
  }
}