const JWT = require("jsonwebtoken")


const validarJWT =(req,res,next)=>{

    //x-token headers

    const token= req.header('x-token')

    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'No hay token en la peticion'
        })
    }

    try {
        
        const {uid,name} = JWT.verify(token,process.env.SECRET_JWT_SEED)

        req.uid = uid
        req.name = name


    } catch (error) {

        return res.status(400).json({
            ok:false,
            msg:'Token no valido'
        })
        
    }




    next()


}

module.exports={
    validarJWT
}