const asyncHandler = require('express-async-handler')
const Auto = require('../models/autosModel')

const getAutos = asyncHandler( async (req, res) => {
    const autos = await Auto.find()
    res.status(200).json(autos)
})

const setAutos = asyncHandler( async (req, res) => {

    if(!req.body.marca){
        res.status(400)
        throw new Error('Es necesario incluir una marca de auto')
    }
    if(!req.body.modelo){
        res.status(400)
        throw new Error('Es necesario incluir un modelo de auto')
    }
    if(!req.body.color){
        res.status(400)
        throw new Error('Es necesario incluir un color de auto')
    }
    if(!req.body.anio){
        res.status(400)
        throw new Error('Es necesario incluir un año de fabricación')
    }

    const autos = await Auto.create({
        marca : req.body.marca,
        modelo : req.body.modelo,
        color : req.body.color,
        anio : req.body.anio
    })

    res.status(201).json(autos);

})

const updateAutos = asyncHandler( async (req, res) => {

    const autos = await Auto.findById(req.params.id)

    if(!autos){
        res.status(400)
        throw new Error('Auto no encontrado, se requiere un ID valido')
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

    const autoEliminado = await Auto.findByIdAndDelete(req.params.id)

    res.status(200).json(autoEliminado)
    
})

module.exports = {
    getAutos,
    setAutos,
    updateAutos,
    deleteAutos
}