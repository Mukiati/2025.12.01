require('dotenv').config()
const JWT = require('jsonwebtoken')
const secretkey = process.env.SECRET_KEY
function Auth()
{
    return (req,res,next)=>{
        try {
            const header = req.headers.authorization
            const decodedtoken = JWT.verify(header,secretkey)
            req.uid = decodedtoken.uid
            console.log(req.uid)
            next()
            
        } catch (error)
        {
            return res.status(409).json({message:"sikertelen hitelesítés"}).end()    
        }
        
    }
}

module.exports = Auth