const mongoose = require('mongoose')

const dbConnection =  async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Felicidade Mongo esta conectado en: ${conn.connection.host}`.red)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnection