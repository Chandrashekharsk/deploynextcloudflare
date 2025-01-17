import {connect} from "@/dbConfig/dbConfig"
import { User } from "@/models/UserModel"
import { NextRequest, NextResponse } from "next/server"

connect();

export const POST = async(request: NextRequest)=>{

  try {
    const reqBody = await request.json();
    const {token} = reqBody;
    console.log(token);
  
    const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}})
    if(!user){
      return NextResponse.json({"error":"Invalid token"}, {status:400});
    }
    console.log(user);

    user.isVarified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      {message: "Email verified Successfully","success":true},
      {status:200}
    );
    
  } catch (error: any) {
    return NextResponse.json({"error":error.message}, {status:500})
  }
}
