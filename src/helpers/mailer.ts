import { User } from "@/models/UserModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"

export const sendEmail = async ({email, emailType, userId}:any) => {
  try {

    // check validation
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if(emailType === "VERIFY_EMAIL") {
      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            verifyToken:hashedToken, 
            verifyTokenExpiry:new Date(Date.now()+ 360000)  // 360,000ms = 360s = 60mins = 1hrs
          }
        }
      )  
    } else if(emailType="RESET_PASSWORD"){
      await User.findByIdAndUpdate(
        userId,
        {
          $set:{
            forgotPassword:hashedToken, 
            forgotPasswordExpiry:new Date(Date.now()+ 360000)  // 360,000ms = 360s = 60mins = 1hrs
          }
        }
      )
    }

    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "62de2d0272abc4", //❌
        pass: "f8098bc5d81786"  //❌
      }
    });

    const mailOptions = {
      from: "chandrashekhar@developer.ai", // sender address
      to: email, 
      subject: emailType, 
      html: `<P>Click 
        <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>
        here</a> to ${emailType== "VERIFY_EMAIL"? "verify email":
        "reset your password"} or copy and paste the link below in your browser 
        <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`, 
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error:any) {
    console.log("Something goes wrong when sending email")
    throw new Error;
  }
};
