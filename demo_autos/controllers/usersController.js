const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const loginUser = asyncHandler( async (req, res) => {
    
    const { email, password } = req.body

    if(!email || !password){
        res.status(400)
        throw new Error('Son obligatorios todos los campos')
    }

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {

        res.status(200).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : tokenGenerator(user.id)
        })

    } else {

        res.status(400)
        throw new Error('Credenciales incorrectas')

    }

})

const registerUser = asyncHandler( async (req, res) => {

    const { name, email, password } = req.body

    if(!name || !email || !password) {

        res.status(400)
        throw new Error('Son necesarios todos los campos')

    }

    const userExists = await User.findOne({email})

    if(userExists){

        res.status(400)
        throw new Error('El correo ya ha sido registrado anteriormente')

    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){

        res.status(200).json({
            _id : user.id,
            name : user.name,
            email : user.email
        })

    } else {

        res.status(400)
        throw new Error('El usuario no puede ser creado, los datos son incorrectos')

    }
    
})

const myData = asyncHandler( async (req, res) => {
    res.json(req.user)
})

const tokenGenerator = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}

module.exports = {
    loginUser,
    registerUser,
    myData
}