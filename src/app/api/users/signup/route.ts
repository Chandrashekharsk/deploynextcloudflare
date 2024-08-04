import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/UserModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse, NextRequest } from "next/server";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqJson = await request.json();
    const { username, email, password } = reqJson;
    console.log(reqJson);

    // check validation
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Alredy Exists!" },
        { status: 400 }
      );
    }

    if (!user) {
      // password hashing using bcryptjs
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // save user in database
      const savedUser = await newUser.save();
      console.log(savedUser);

      // send verification email
      await sendEmail({
        email,
        emailType: "VERIFY_EMAIL",
        userId: savedUser._id,
      });

      return NextResponse.json(
        {
          message: "User Registered Successfully!",
          success: true,
          savedUser,
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
