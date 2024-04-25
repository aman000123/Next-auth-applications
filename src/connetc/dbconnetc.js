import mongoose, { Connection } from "mongoose";

//database hamesha dusre continent me rhta hai
//data base connetcion me time lgta hai so async

// const connection:ConnectionObject={}
// async function dbConnect {}:Promise{

//     id

// }




const Connect = async () => {

    try {
        //const url = process.env.MONGO_URI
        const url = 'mongodb+srv://amishra73185:amishra73185@cluster0.vywayuf.mongodb.net/NextJsAuthApplicationWithZodLibrary?retryWrites=true&w=majority'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            dbName: 'NextJsAuthApplicationWithZodLibrary'

        });
        console.log("connected to database succesfullly with ")
    }
    catch (err) {
        console.log("err in connection", err)
    }

}


export default Connect