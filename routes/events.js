const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-JWT');
const { getEventos, createEvent, updateEvent, getEventById, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use(validarJWT)


router.get("/",getEventos)

router.post(
    "/",
    [
        check('title','el titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de inicio es obligatoria').custom(isDate),
        validarCampos
    ],
    createEvent)

router.put("/:id",updateEvent)

router.delete("/:id",deleteEvent)


module.exports = router