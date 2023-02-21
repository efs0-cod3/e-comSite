const jwt = require('jsonwebtoken');
const User = require("../model/User");

const verifyToken = async (req,res,next) =>  {
   try {
     // nombramos el header del token
     const token = req.headers["x-access-token"]

     console.log(token);
     // verificamos la existencia del token y de no ser asi enviamos msj de error
     if(!token) {return res.status(403).json({message: "No token provided"})};
 
     // si existe decodificamos el token para obtener el id del user
     const decodedToken = jwt.verify(token, process.env.SECRET)
 
    //  busca el usuario por via del id encriptado en el token
     const user = await User.findById(decodedToken.id, {password:0})
     if(!user) return res.status(403).json({message: "No user found"})
     
     next()
   } catch (error) {
    return res.status(401).json({message: "Unautorized"})
   }
}

module.exports = verifyToken