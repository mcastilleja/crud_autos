const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : [true, 'Es necesario un nombre']
    },
    email : {
        type : String,
        require : [true, 'Es necesario un correo electronico']
    },
    password : {
        type : String,
        require : [true, 'Es necesario un password']
    }
},{
    timestamps : true
})

module.exports = mongoose.model('User', userSchema)