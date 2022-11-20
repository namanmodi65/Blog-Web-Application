const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const mongoURL = process.env.MONGOOSE_URL

const connectToMongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connected to mongoose")
    })
}

module.exports = connectToMongo