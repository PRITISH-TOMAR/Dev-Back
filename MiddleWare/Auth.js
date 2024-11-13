import { Validate } from "../Services/Auth.js";



export default function CheckForAuthenticationCookie(cookieName)
{
    console.log(cookieName)
    return( req, res, next)=>
    {

     const tokenCookie = req.cookies[cookieName]
        if(!tokenCookie){
          return res.status(401).json({message : "Unauthorized"})
        }

        try
        {

            const userPayload = Validate(tokenCookie)
            req.user(userPayload)
        }
        catch(e)
        {
                console.log("Error" , e)
        }

        return next();


    }
}
