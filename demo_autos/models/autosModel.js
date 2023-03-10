const mongoose =  require('mongoose')

const autoSchema =  mongoose.Schema({
    marca : {
        type : String,
        required : [true, 'Es necesario ingresar una marca de auto']
    },
    modelo : {
        type : String,
        required : [true, 'Es necesario ingresar un modelo de auto']
    }, 
    color : {
        type : String,
        required : [true, 'Es necesario ingresar el color del auto']
    }, 
    anio : {
        type : Number,
        required : [true, 'Es necesario ingresar un año']
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Auto', autoSchema)