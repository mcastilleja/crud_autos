const asyncHandler = require('express-async-handler')
const Auto = require('../models/autosModel')

const getAutos = asyncHandler( async (req, res) => {
    const autos = await Auto.find({user : req.user.id})
    res.status(200).json(autos)
})

const setAutos = asyncHandler( async (req, res) => {

    if(!req.body.marca || !req.body.modelo || !req.body.color || !req.body.anio){
        res.status(400)
        throw new Error('Son necesarios todos los campos')
    }

    const autos = await Auto.create({
        marca : req.body.marca,
        modelo : req.body.modelo,
        color : req.body.color,
        anio : req.body.anio,
        user : req.user.id
    })

    res.status(201).json(autos);

})

const updateAutos = asyncHandler( async (req, res) => {

    const autos = await Auto.findById(req.params.id)

    if(!autos){
        res.status(400)
        throw new Error('Auto no encontrado, se requiere un ID valido')
    }

    if(autos.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('ACCESO NO AUTORIZADO, El auto no pertenece al usuario logeado')
    }

    const autoModificado = await Auto.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(autoModificado)
})

const deleteAutos = asyncHandler( async (req, res) => {

    const autos = await Auto.findById(req.params.id)

    if(!autos){
        res.status(400)
        throw new Error('Auto no encontrado, se requiere un ID valido')
    }

    if(autos.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('ACCESO NO AUTORIZADO, El auto no pertenece al usuario logeado')
    }

    const autoEliminado = await Auto.findByIdAndDelete(req.params.id)

    res.status(200).json(autoEliminado)
    
})

module.exports = {
    getAutos,
    setAutos,
    updateAutos,
    deleteAutos
}