const EventoModel = require("../models/EventoModel")



const getEventos = async(req,res)=>{

try {

    const eventos = await EventoModel.find().populate('user','name')

    return res.status(201).json({
        ok:true,
        eventos
    })
    
} catch (error) {

    console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error al registrar evento comuniquese con su administrador'
        })
    
}
return res.json({
    ok:true,
    msg:'getEventos'
})

}

const getEventById=(req,res)=>{

}

const createEvent =async (req,res)=>{

    //verificar que tenga el evento
    try {

        const evento = new EventoModel(req.body)
        evento.user = req.uid
        const newEvento = await evento.save()
        
        return res.status(201).json({
            ok:true,
            evento:evento
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error al registrar evento comuniquese con su administrador'
        })
    }

}

const updateEvent = async(req,res)=>{

    const id = req.params.id
    const uid = req.uid

    try {

        const evento = await EventoModel.findById(id)
        
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese Id'
            })
        }

        if(evento.user.toString()!== uid){
            return res.status(404).json({
                ok:false,
                msg:'No esta autorizado para realizar esta accion'
            })
        }

        const nuevoEvento ={
            ...req.body,
            user:uid
        }

        const updatedEvent = await EventoModel.findByIdAndUpdate(id,nuevoEvento,{new:true})

        return res.json({
            ok:true,
            evento:updatedEvent
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar evento comuniquese con su administrador'
        })
        
    }

}

const deleteEvent =async (req,res)=>{

    const id = req.params.id
    const uid = req.uid
    try {

        const evento = await EventoModel.findById(id)
        
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese Id'
            })
        }

        if(evento.user.toString()!== uid){
            return res.status(404).json({
                ok:false,
                msg:'No esta autorizado para eliminar ese evento'
            })
        }

        const deletedEvent = await EventoModel.findByIdAndDelete(id)

        res.status(201).json({
            ok:true,
            msg:"evento actualizado con exito"
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error al eliminar evento comuniquese con su administrador'
        })
        
    }

}

module.exports ={
    getEventos,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}