const { Router } = require('express');
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');




const router = Router();

router.get(
    "/",
    [
        check('email','ingrese un email correcto').isEmail(),
        check('password','el password debe tener minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario)
router.post(
    "/new",
    [
        check('name','el nombre es obligatorio').not().isEmpty(),
        check('email','ingrese un email correcto').isEmail(),
        check('password','el password debe tener minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario)
router.get("/renew",validarJWT, revalidarToken)

module.exports = router