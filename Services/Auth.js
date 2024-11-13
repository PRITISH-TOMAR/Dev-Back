import JWT from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });



const secret = process.env.JWT_END;


export function createToken(user)
{
    
    const payload = {
        _id:user._id,
        email: user.email,
        fullName: user.fullName,
        role: "USER",
        uniqueName: user.uniqueName,
        profilePicture: user.profilePicture

    }


    const token = JWT.sign(payload, secret)
   
    return token;
}


export function Validate (token) {
    const payload = JWT.verify(token, secret)
    return payload;
}

// export default {Validate, createToken}