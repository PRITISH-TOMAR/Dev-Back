import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });


// SERIVCE CONNECTOR
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
   
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.USERPASS
  }
});


//..............................Send Message.....................................
export const NewsLetter = async (req, res) => {

    // console.log(req.body);
    const {email} = req.body

  const mailToUser = {
    from: process.env.SENDERMAIL,
    to: email,
    subject: "Confirmation from Admin AlphaLearn",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="https://alphalearn-dev.netlify.app"> <img src="https://i.ibb.co/Fsq94T3/Alpha.png" alt="AlphaLearn" style="user-select: none; width: 150px; margin-bottom: 20px;"></a>
        </div>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
         Hello dear,
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          Thank you for subscribing to our newsletter and building the trust in our comprehensions and services. 
        </p>
       
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
        Get ready to deep dive in advanced algorithms and programming.
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
       Subscribed from :${email}
        </p>
        <p style="color: #555; line-height: 1.5; margin-bottom: 20px;">
          If you have any questions or need assistance, please feel free to reach out to us. We are here to help!
        </p>
        <p style="text-align:left;"> Admin AlphaLearn</p>
      </div>
    `,
  };
  


try {
  const info = await transporter.sendMail(mailToUser);
  console.log("Email sent for newsletter confrmation: ", info.response);
  res.status(200).send("Thanks for subscibing us.");

 

} catch (error)
{
  res.status(400).json({message:"Error : "+ error})
}


}

