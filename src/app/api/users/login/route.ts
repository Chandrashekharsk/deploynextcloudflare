import {connect} from "@/dbConfig/dbConfig";
import {User} from "@/models/UserModel"
import bcryptjs from "bcryptjs"
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken"
connect();

export const POST = async(request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const {email, password} = reqBody;

    const user = await User.findOne({email});
    if(!user) {
      return NextResponse.json({message:"Invalid email or password"}, {status:400})
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if(!isValidPassword) {
      return NextResponse.json({message:"Invalid email or password"}, {status:400})
    }

    const tokenData = {
      id : user._id,
      email : user.email,
      username: user.username,
    }

    const token = jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET!,
      {expiresIn: '1d'}
    )

    const response  = NextResponse.json({
      message: "User Login Successful",
      success: true
    }, {status:200});

    response.cookies.set(
      "token", token,
      {httpOnly : true}
    )
    return response;

  } catch (error:any) {
    return NextResponse.json({error:error.message}, {status:500})
  }
}