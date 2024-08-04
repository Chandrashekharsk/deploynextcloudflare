import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export const POST = async(request: NextRequest) =>{
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id:userId }).select("-password");
    if(!user){
      return NextResponse.json({message:"User doesn't exists"}, {status:400})
    }
    
    return NextResponse.json({message:"User found", data:user})

  } catch (error:any) {
    return NextResponse.json({error:error.message}, {status:500})
  }
}



