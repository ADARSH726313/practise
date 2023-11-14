const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const Url = "mongodb://127.0.0.1:27017/Surveys";
        // mongodb connection string
        const con = await mongoose.connect(Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
        // 1 = true
    }
}

module.exports = connectDB