import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });



const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
   
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.USERPASS
  }
});


//..............................Send Message.....................................
export const SendMessage = async (req, res) => {

    // console.log(req.body);
    const {name, email, phone, message} = req.body

  const mailToUser = {
    from: process.env.SENDERMAIL,
    to: email,
    subject: "Message from ALphaLearn",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="https://alphalearn-dev.netlify.app"> <img src="https://i.ibb.co/Fsq94T3/Alpha.png" alt="AlphaLearn" style="user-select: none; width: 150px; margin-bottom: 20px;"></a>
        </div>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          Dear User,
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          Thank you for connecting with us. We have received your message and we really appreciate your concerns towards marginal technology. 
        </p>
       
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
         Our team will reach you soon!
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          If you have any questions or need assistance, please feel free to reach out to us. We are here to help!
        </p>
        <p style="text-align:left;"> Admin AlphaLearn</p>
      </div>
    `,
  };
  

  const mailToAdmin = {
    from: process.env.SENDERMAIL,
    to: process.env.SENDERMAIL,
    subject: "New Message from site",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="addlink.com"> <img src="https://i.ibb.co/Fsq94T3/Alpha.png" alt="AlphaLearn" style="user-select: none; width: 150px; margin-bottom: 20px;"></a>
        </div>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          Dear Admin,
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
         A new message received at the AlphaLearn Deployment.
        </p>
       
        <p style="color: #555; text-align:left; line-height: 1.5; margin-bottom: 20px;">
         User_Name : ${name}
        </p>
         <p style="color: #555; text-align:left; line-height: 1.5; margin-bottom: 20px;">
         User_Email : ${email}
        </p>
         <p style="color: #555; text-align:left; line-height: 1.5; margin-bottom: 20px;">
         User_Phone : ${phone}
        </p>
         <p style="color: #555; text-align:left; line-height: 1.5; margin-bottom: 20px;">
         Message : ${message}
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          
        </p>
      </div>
    `,
  };


try {
  const info = await transporter.sendMail(mailToUser);
  console.log("Email sent: ", info.response);
  res.status(200).send("Thanks for Contacting us.");

  const admin = await transporter.sendMail(mailToAdmin);
  console.log("Email sent to admin: ", info.response);

} catch (error)
{
  res.status(400).json({message:"Error : "+ error})
}


}

