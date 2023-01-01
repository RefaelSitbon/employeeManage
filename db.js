const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Org'

module.exports = async function connection() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log('Connected to Mongo');
    }catch(err){
        console.log(err);
        console.log('Fail to connect the DB');
    }
}