import jwt from 'jsonwebtoken';



const generateTokenAndSetCookie = (userId,res)=>{
    const token= jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    });

    res.cookie("JWT",token,{
        httpOnly:true, //this cookie cannot  be accessed by the browser/more secure
        maxAge:15* 24 * 60 * 60 * 1000, //15 days
        sameSite:"strict", //CSRF (more protection)
    })

    return token;
}


export default  generateTokenAndSetCookie;