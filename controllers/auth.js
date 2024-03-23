const { generarJWT } = require("../helpers/jwt")
const UsuarioModel = require("../models/UsuarioModel")
const bcryppt = require('bcryptjs')


const crearUsuario = async (req, res) => {

    const { name, email, password } = req.body

    try {

        let usuario = await UsuarioModel.findOne({ email: email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'un Usuario ya existe con ese Email'
            })
        }

        usuario = new UsuarioModel(req.body)
        //Encriptar contraseña
        const salt = bcryppt.genSaltSync();
        usuario.password = bcryppt.hashSync(password, salt)

        //Grabar en bd
        await usuario.save()

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }

}

const loginUsuario = async (req, res) => {

    const { email, password } = req.body

    try {

        let usuario = await UsuarioModel.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe Usuario con ese Email'
            })
        }

        //confirmar password

        const validPassword = bcryppt.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        return res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })


    }



}

const revalidarToken =async (req, res) => {

    const uid = req.uid
    const name = req.name


    console.log(name)
    try {

        const token = await generarJWT(uid, name)

        return res.json({
            ok: true,
            token
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }



}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}