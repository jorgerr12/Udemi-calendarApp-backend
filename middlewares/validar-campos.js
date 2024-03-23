const { validationResult } = require("express-validator");



const validarCampos = (req, res, next) => {

    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({
            ok: false,
            errors: result.mapped()
        });
    }
    next()
}

module.exports = {
    validarCampos
}