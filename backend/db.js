const mongoose = require('mongoose');
const env = require('dotenv')

 
env.config();

console.log(process.env,"/n");
const mongoURI = process.env.URI;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to DB!'))
    .catch(error => console.log(error))
}

module.exports = connectToMongo;